from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.oauth2 import get_current_user
from image_utils import resize_base64_image
from db.models import User
from db.schemas import PostBase
from db import db_handler
from db.database import get_db
from fastapi import Query
from fastapi import Request

router = APIRouter(tags=["posts"])


@router.get("/post/{post_id}/image/{index}")
def get_post_image(
    post_id: int,
    index: int,
    size: str = Query("thumbnail", regex="^(thumbnail|full)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image = db_handler.get_post_images(db, post_id).Images[index].Image

    if size == "thumbnail":
        image = resize_base64_image(image, max_size=(1000, 1000), quality=70)

    return image


@router.get("/user/{username}/posts")
def get_user_posts(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_all_posts_by_user(db, username=username)


@router.post("/upload-post")
def create_post(
    request: PostBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    request.Image = resize_base64_image(
        request.Image, max_size=(2000, 2000), quality=85
    )
    return db_handler.create_post(db, request, current_user)


@router.get("/post/{post_id}")
def get_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.get_post_display(db, post_id, current_user)
