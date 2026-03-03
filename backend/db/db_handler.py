from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import joinedload
from db.schemas import PostBase, UserAuth
from .models import Post, PostImage, User
from sqlalchemy.orm.session import Session
from auth.hashing import get_password_hash
from typing import List


def create_post(db: Session, request: PostBase, current_user: User) -> Post:
    new_post = Post(
        UserID=current_user.ID, Date=datetime.now(), Description=request.Description
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    post_ID = (
        db.query(Post)
        .filter(Post.UserID == current_user.ID)
        .filter(Post.Date == new_post.Date)
        .first()
        .ID  # type: ignore
    )

    new_image = PostImage(PostID=post_ID, image=request.image)
    db.add(new_image)
    db.commit()
    db.refresh(new_image)
    return new_post


def get_all_posts_by_user(db: Session, username: str) -> List[Post]:
    user_id = get_user_by_username(db, username=username).ID
    return (
        db.query(Post)
        .options(joinedload(Post.images))
        .filter(Post.UserID == user_id)
        .all()
    )


def get_user_by_username(db: Session, username: str) -> User:
    user = db.query(User).filter(User.Username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with username {username} not found",
        )
    return user


def does_user_exist(db: Session, username: str) -> bool:
    return db.query(User).filter(User.Username == username).first() is not None


def create_user(db: Session, username: str, password: str) -> User:
    if does_user_exist(db, username=username):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with username {username} already exists",
        )
    new_user = User(Username=username, HashedPassword=get_password_hash(password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update_user_bio(db: Session, username: str, new_bio: str) -> User:
    user = get_user_by_username(db, username=username)
    user.Bio = new_bio
    db.commit()
    db.refresh(user)
    return user

def update_user_profile_picture(db: Session, username: str, new_profile_picture: str) -> User:
    user = get_user_by_username(db, username=username)
    user.ProfileImage = new_profile_picture
    db.commit()
    db.refresh(user)
    return user

def get_users_by_search_text(db: Session, search_text: str) -> List[User]:
    search_pattern = f"%{search_text}%"
    return db.query(User).filter(User.Username.ilike(search_pattern)).all()
