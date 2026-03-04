from fastapi import APIRouter, Depends
from auth.oauth2 import get_current_user
from db.models import User
from routers.posts import get_user_posts
from db import db_handler
from db.schemas import SignUp, ProfileBio, ProfilePicture
from db.database import get_db
from sqlalchemy.orm.session import Session


router = APIRouter(tags=["users"])


@router.post("/signup")
def sign_up(request: SignUp, db: Session = Depends(get_db)):
    return db_handler.create_user(
        db, username=request.username, password=request.password
    )


@router.get("/users/search")
def search_user(
    search_text: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_users_by_search_text(db, search_text)


@router.get("/user/{username}/profile")
def get_user_profile(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user = db_handler.get_user_by_username(db, username=username)
    posts = get_user_posts(username=username, db=db, current_user=current_user)
    already_following = db_handler.is_following(db, username, current_user)
    return {"User": user, "Posts": posts, "AlreadyFollowing": already_following}


@router.get("/self/profile")
def get_user_homepage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_profile(
        username=current_user.Username, db=db, current_user=current_user
    )


@router.post("/user/edit-profile-picture")
def edit_profile_picture(
    request: ProfilePicture,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.update_user_profile_picture(
        db, current_user.Username, request.image
    )


@router.post("/user/edit-profile-bio")
def edit_profile_bio(
    request: ProfileBio,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.update_user_bio(db, current_user.Username, request.text)
