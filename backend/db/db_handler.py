from datetime import datetime
from sqlalchemy.orm import joinedload
from db.schemas import PostBase
from .models import Post, PostImage
from sqlalchemy.orm.session import Session


def create_post(db: Session, request: PostBase) -> Post:
    new_post = Post(
        UserID=request.UserID, Date=datetime.now(), Description=request.Description
    )
    new_image = PostImage(PostID=new_post.ID, image=request.image)
    db.add(new_post)
    db.add(new_image)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts_by_user(db: Session, user_id: int):
    return (
        db.query(Post)
        .options(joinedload(Post.images))
        .filter(Post.UserID == user_id)
        .all()
    )
