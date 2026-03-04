from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.oauth2 import get_current_user
from db.models import User
from db.schemas import PostBase, UserAuth
from db import db_handler
from db.database import get_db

router = APIRouter(tags=["posts"])


@router.get("/user/{username}/posts")
def get_user_posts(
    username: str,
    db: Session = Depends(get_db),
    current_user: UserAuth = Depends(get_current_user),
):
    return db_handler.get_all_posts_by_user(db, username=username)


@router.post("/upload-post")
def create_post(
    request: PostBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.create_post(db, request, current_user)


@router.get("/post/{post_id}")
def get_post(post_id: int, db: Session = Depends(get_db)):
    return db_handler.get_post_display(db, post_id)
