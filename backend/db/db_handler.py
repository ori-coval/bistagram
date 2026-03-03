from datetime import datetime
from sqlalchemy.orm import joinedload
from db.schemas import PostBase
from .models import Post, PostImage
from sqlalchemy.orm.session import Session


def create_post(db: Session, request: PostBase) -> Post:
    new_post = Post(
        UserID=request.UserID, Date=datetime.now(), Description=request.Description
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    post_ID = (
        db.query(Post)
        .filter(Post.UserID == request.UserID)
        .filter(Post.Date == new_post.Date)
        .first()
        .ID
    )

    new_image = PostImage(PostID=post_ID, image=request.image)
    db.add(new_image)
    db.commit()
    db.refresh(new_image)
    return new_post


def get_all_posts_by_user(db: Session, user_id: int):
    return (
        db.query(Post)
        .options(joinedload(Post.images))
        .filter(Post.UserID == user_id)
        .all()
    )
