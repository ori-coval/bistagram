from datetime import datetime
from hmac import new
from turtle import pos
from fastapi import HTTPException, status
from sqlalchemy.orm import joinedload, load_only
from db.schemas import CommentBase, PostBase, followBase
from .models import Comments, Likes, Post, PostImage, User, follows
from sqlalchemy.orm.session import Session
from auth.hashing import get_password_hash
from typing import List
from sqlalchemy import and_, func, select


def create_post(db: Session, request: PostBase, current_user: User) -> Post:

    if request.Image is None or request.Image == "":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image is required",
        )

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


def get_all_posts_by_user(db: Session, username: str) -> List[dict]:
    user = get_user_by_username(db, username)

    images_count_subquery = (
        select(func.count(PostImage.ID))
        .where(PostImage.PostID == Post.ID)
        .scalar_subquery()
    )
    likes_count_subquery = (
        select(func.count(Likes.ID)).where(Likes.PostID == Post.ID).scalar_subquery()
    )
    comments_count_subquery = (
        select(func.count(Comments.ID))
        .where(Comments.PostID == Post.ID)
        .scalar_subquery()
    )

    raw_posts = (
        db.query(
            Post,
            images_count_subquery.label("image_count"),
            likes_count_subquery.label("likes_count"),
            comments_count_subquery.label("comments_count"),
        )
        .filter(Post.UserID == user.ID)
        .order_by(Post.Date.desc())
    ).all()

    results = []
    for post, image_count, likes_count, comments_count in raw_posts:
        results.append(
            {
                "ID": post.ID,
                "Description": post.Description,
                "Date": post.Date,
                "ImageCount": int(image_count or 0),
                "LikesCount": int(likes_count or 0),
                "CommentsCount": int(comments_count or 0),
            }
        )
    return results


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
            detail=f"USER_EXISTS",
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


def create_comment(
    db: Session, request: CommentBase, current_user: User
) -> List[Comments]:
    if not db.query(Post).filter(Post.ID == request.PostID).first():
        raise HTTPException(404, "Post not found")

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
    return get_post_display(db, request.PostID, current_user)


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


def get_user_following(db: Session, username: str):
    user = get_user_by_username(db, username=username)
    following = (
        db.query(User)
        .join(follows, follows.FollowedID == User.ID)
        .filter(follows.FollowerID == user.ID)
        .all()
    )
    return following


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


def get_post_display(db: Session, post_id: int, current_user: User):
    post = (
        db.query(Post)
        .options(
            joinedload(Post.Images),
            joinedload(Post.User),
            joinedload(Post.Comments).joinedload(Comments.CommentUser),
        )
        .order_by(Post.Date.desc())
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
    post.AlreadyLiked = any(like.UserID == current_user.ID for like in post.Likes)
    post.CommentsCount = len(post.Comments)
    post.LikesCount = len(post.Likes)
    del post.Likes
    post.Comments.sort(key=lambda comment: comment.Date, reverse=True)
    return post


def get_following_posts(db: Session, current_user: User):
    following = db.query(follows).filter(follows.FollowerID == current_user.ID).all()
    following_ids = [follow.FollowedID for follow in following]
    if not following_ids:
        return []

    images_count_subquery = (
        select(func.count(PostImage.ID))
        .where(PostImage.PostID == Post.ID)
        .scalar_subquery()
    )
    likes_count_subquery = (
        select(func.count(Likes.ID)).where(Likes.PostID == Post.ID).scalar_subquery()
    )
    comments_count_subquery = (
        select(func.count(Comments.ID))
        .where(Comments.PostID == Post.ID)
        .scalar_subquery()
    )

    already_liked_subquery = (
        select(func.count(Likes.ID))
        .where(and_(Likes.PostID == Post.ID, Likes.UserID == current_user.ID))
        .scalar_subquery()
    )

    raw_posts = (
        db.query(
            Post,
            images_count_subquery.label("image_count"),
            likes_count_subquery.label("likes_count"),
            comments_count_subquery.label("comments_count"),
            already_liked_subquery.label("already_liked_count"),
        )
        .join(User, User.ID == Post.UserID)
        .filter(Post.UserID.in_(following_ids))
        .order_by(Post.Date.desc())
    ).all()

    posts = []
    for (
        post,
        image_count,
        likes_count,
        comments_count,
        already_liked_count,
    ) in raw_posts:
        user = (
            db.query(User)
            .options(load_only(User.Username, User.ProfileImage))
            .filter(User.ID == post.UserID)
            .one()
        )

        posts.append(
            {
                "ID": post.ID,
                "Description": post.Description,
                "Date": post.Date,
                "User": {"Username": user.Username, "ProfileImage": user.ProfileImage},
                "ImageCount": int(image_count or 0),
                "LikesCount": int(likes_count or 0),
                "CommentsCount": int(comments_count or 0),
                "AlreadyLiked": bool(
                    already_liked_count and int(already_liked_count) > 0
                ),
            }
        )

    return posts


def get_post_images(db: Session, post_id: int) -> Post:
    post = (
        db.query(Post)
        .options(joinedload(Post.Images))
        .filter(Post.ID == post_id)
        .first()
    )
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


def get_all_usernames(db: Session) -> List[str]:
    return list(db.execute(select(User.Username)).scalars().all())
