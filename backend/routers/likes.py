
from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session
from auth.oauth2 import get_current_user
from db.models import User
from db.database import get_db
from db import db_handler


router = APIRouter(tags=["likes"])

@router.get("/post/{post_id}/likes/count")
def get_post_likes_count(post_id: int, db: Session = Depends(get_db)):
    return db_handler.get_post_likes_count(db, post_id)

@router.get("/post/{post_id}/likes")
def get_post_likes(post_id: int, db: Session = Depends(get_db)):
    return db_handler.get_posts_likes(db, post_id)

@router.post("/post/{post_id}/like")
def like_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_handler.like_post(db, post_id, current_user.ID)
    return {"message": "Post liked successfully"}

@router.post("/post/{post_id}/unlike")
def unlike_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_handler.unlike_post(db, post_id, current_user.ID)
    return {"message": "Post unliked successfully"}