from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session
from auth.oauth2 import get_current_user
from db.schemas import followBase
from db.models import User
from db.database import get_db
from db import db_handler


router = APIRouter(tags=["followers"])


@router.post("/follow")
def follow_user(
    request: followBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.follow_user(db, request, current_user)


@router.post("/unfollow")
def unfollow_user(
    request: followBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.unfollow_user(db, request, current_user)


@router.get("/user/{username}/followers")
def get_user_followers(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_user_followers(db, username=username)


@router.get("/user/{username}/following")
def get_user_following(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_user_following(db, username=username)


@router.get("/user/{username}/followers-count")
def get_user_followers_count(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_followers_count(db, username=username)
