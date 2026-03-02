from ..routers.schemas import PostBase, PostDisplay
from .models import Post
from sqlalchemy.orm.session import Session
import datetime
from fastapi import HTTPException, status

def create_post(db: Session, request: PostBase) -> Post:
        new_post = Post(
                image_url = request.image_url,
                description = request.description,
                timestamp = datetime.datetime.now(),
                user_id = request.creator_id
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post

def get_all_posts_by_user(db: Session, user_id: int):
        return db.query(Post).filter(Post.user_id == user_id).all()
