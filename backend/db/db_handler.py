from datetime import datetime
from turtle import pos
from fastapi import HTTPException, status
from sqlalchemy.orm import joinedload
from db.schemas import PostBase
from .models import Likes, Post, PostImage, User
from sqlalchemy.orm.session import Session
from auth.hashing import get_password_hash
from typing import List
from sqlalchemy import func


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

def get_post_by_id(db: Session, post_id: int) -> Post:
    post = (
        db.query(Post)
        .filter(Post.ID == post_id)
        .first()
    )
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    likes_count = len(post.likes)
    del post.likes
    post.likes_count = likes_count
    return post


def get_posts_likes(db: Session, post_id: int) -> List[Likes]:
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    return post.likes


def get_all_posts_by_user(db: Session, username: str) -> List[Post]:
    user_id = get_user_by_username(db, username=username).ID
    posts = (
        db.query(Post)
        .options(joinedload(Post.images), joinedload(Post.likes))
        .filter(Post.UserID == user_id)
        .all()
    )
    for post in posts:
        post.likes_count = len(post.likes)
        del post.likes
    return posts


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


def update_user_profile_picture(
    db: Session, username: str, new_profile_picture: str
) -> User:
    user = get_user_by_username(db, username=username)
    user.ProfileImage = new_profile_picture
    db.commit()
    db.refresh(user)
    return user


def get_users_by_search_text(db: Session, search_text: str) -> List[User]:
    search_pattern = f"%{search_text}%"
    return db.query(User).filter(User.Username.ilike(search_pattern)).all()


def get_post_likes_count(db: Session, post_id: int) -> int:
    likes = db.query(Post).filter(Post.ID == post_id).first()
    if not likes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    return len(likes.likes)


def like_post(db: Session, post_id: int, user_id: int):
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    if any(like.UserID == user_id for like in post.likes):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has already liked this post",
        )
    new_like = Likes(UserID=user_id, PostID=post_id)
    db.add(new_like)
    db.commit()


def unlike_post(db: Session, post_id: int, user_id: int):
    like = (
        db.query(Likes).filter(Likes.PostID == post_id, Likes.UserID == user_id).first()
    )
    if not like:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has not liked this post",
        )
    db.delete(like)
    db.commit()
