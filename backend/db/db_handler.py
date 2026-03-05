from datetime import datetime
from hmac import new
from turtle import pos
from fastapi import HTTPException, status
from sqlalchemy.orm import joinedload
from db.schemas import CommentBase, PostBase, followBase
from .models import Comments, Likes, Post, PostImage, User, follows
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

    new_image = PostImage(PostID=post_ID, Image=request.Image)
    db.add(new_image)
    db.commit()
    db.refresh(new_image)
    return new_post


def get_post_by_id(db: Session, post_id: int) -> Post:
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    likes_count = len(post.Likes)
    del post.Likes
    post.likes_count = likes_count
    return post


def get_posts_likes(db: Session, post_id: int) -> List[Likes]:
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    return post.Likes


def get_all_posts_by_user(db: Session, username: str) -> List[Post]:
    user_id = get_user_by_username(db, username=username).ID
    posts = (
        db.query(Post)
        .options(
            joinedload(Post.Images), joinedload(Post.Likes), joinedload(Post.Comments)
        )
        .filter(Post.UserID == user_id)
        .all()
    )
    for post in posts:
        Images = []
        for image in post.Images:
            Images.append(image.Image)

        del post.Images
        post.RawImages = Images
        post.likes_count = len(post.Likes)
        post.comments_count = len(post.Comments)
        del post.Likes
        del post.Comments
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
    return len(likes.Likes)


def like_post(db: Session, post_id: int, user_id: int):
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    if any(like.UserID == user_id for like in post.Likes):
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


def get_post_comments(db: Session, post_id: int):
    post = db.query(Post).filter(Post.ID == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    return post.Comments


def create_comment(db: Session, request: CommentBase, current_user: User) -> Comments:
    comment = Comments(
        PostID=request.PostID,
        ParentCommentID=request.ParentCommentID,
        CommenterID=current_user.ID,
        Date=datetime.now(),
        Comment=request.Comment,
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def follow_user(db: Session, request: followBase, current_user: User):
    if not does_user_exist(db, request.Username):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with username {request.Username} not found",
        )
    if request.Username == current_user.Username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot follow yourself",
        )
    if (
        db.query(follows)
        .filter(
            follows.FollowerID == current_user.ID,
            follows.FollowedID == get_user_by_username(db, request.Username).ID,
        )
        .first()
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You are already following {request.Username}",
        )

    new_follow = follows(
        FollowerID=current_user.ID,
        FollowedID=get_user_by_username(db, request.Username).ID,
    )
    db.add(new_follow)
    db.commit()
    return {"message": f"You are now following {request.Username}"}


def unfollow_user(db: Session, request: followBase, current_user: User):
    follow = (
        db.query(follows)
        .filter(
            follows.FollowerID == current_user.ID,
            follows.FollowedID == get_user_by_username(db, request.Username).ID,
        )
        .first()
    )
    if not follow:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You are not following {request.Username}",
        )
    db.delete(follow)
    db.commit()
    return {"message": f"You have unfollowed {request.Username}"}


def get_user_followers(db: Session, username: str):
    user = get_user_by_username(db, username=username)
    followers = (
        db.query(User)
        .join(follows, follows.FollowerID == User.ID)
        .filter(follows.FollowedID == user.ID)
        .all()
    )
    return followers


def is_following(db: Session, username: str, current_user: User) -> bool:
    user = get_user_by_username(db, username=username)
    return (
        db.query(follows)
        .filter(
            follows.FollowerID == current_user.ID,
            follows.FollowedID == user.ID,
        )
        .first()
        is not None
    )


def get_followers_count(db: Session, username: str) -> int:
    user = get_user_by_username(db, username=username)
    followers_count = (
        db.query(func.count(follows.FollowerID))
        .filter(follows.FollowedID == user.ID)
        .scalar()
    )
    return followers_count


def get_following_count(db: Session, username: str) -> int:
    user = get_user_by_username(db, username=username)
    following_count = (
        db.query(func.count(follows.FollowedID))
        .filter(follows.FollowerID == user.ID)
        .scalar()
    )
    return following_count


def get_post_display(db: Session, post_id: int):
    post = (
        db.query(Post)
        .options(
            joinedload(Post.Images),
            joinedload(Post.User),
            joinedload(Post.Comments).joinedload(Comments.CommentUser),
        )
        .filter(Post.ID == post_id)
        .first()
    )
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )
    Images = []
    for image in post.Images:
        Images.append(image.Image)

    del post.Images
    post.RawImages = Images
    post.AlreadyLiked = any(like.UserID == post.User.ID for like in post.Likes)
    post.CommentsCount = len(post.Comments)
    post.LikesCount = len(post.Likes)
    del post.Likes
    return post


def get_following_posts(db: Session, current_user: User):
    db.query(follows).filter(follows.FollowerID == current_user.ID).all()
    following = db.query(follows).filter(follows.FollowerID == current_user.ID).all()
    following_ids = [follow.FollowedID for follow in following]
    posts = (
        db.query(Post)
        .options(joinedload(Post.Images), joinedload(Post.User))
        .filter(Post.UserID.in_(following_ids))
        .order_by(Post.Date.desc())
        .all()
    )

    for post in posts:
        if post.User.ID:
            del post.User.ID
        if post.User.Bio:
            del post.User.Bio
        if post.User.HashedPassword:
            del post.User.HashedPassword
        del post.UserID

        Images = []
        for image in post.Images:
            Images.append(image.Image)

        del post.Images
        post.RawImages = Images

        post.LikesCount = len(post.Likes)
        post.CommentsCount = len(post.Comments)
        post.AlreadyLiked = any(like.UserID == current_user.ID for like in post.Likes)
        del post.Likes
        del post.Comments

    return posts
