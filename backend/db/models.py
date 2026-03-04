from typing import List
from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base


class User(Base):
    __tablename__ = "User"

    ID: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    Username: Mapped[str] = mapped_column(String, unique=True, index=True)
    HashedPassword: Mapped[str] = mapped_column(String)
    Bio: Mapped[str] = mapped_column(String)
    ProfileImage: Mapped[str] = mapped_column(String)

    posts: Mapped[List["Post"]] = relationship("Post", back_populates="user")
    likes: Mapped[List["Likes"]] = relationship("Likes", back_populates="LikeUser")
    comments: Mapped[List["Comments"]] = relationship(
        "Comments", back_populates="CommentUser"
    )


class Post(Base):
    __tablename__ = "Post"

    ID: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    UserID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    Date: Mapped[DateTime] = mapped_column(DateTime)
    Description: Mapped[str] = mapped_column(String)

    user: Mapped["User"] = relationship("User", back_populates="posts")
    images: Mapped[List["PostImage"]] = relationship("PostImage", back_populates="post")
    likes: Mapped[List["Likes"]] = relationship("Likes", back_populates="LikePost")
    comments: Mapped[List["Comments"]] = relationship(
        "Comments", back_populates="CommentPost"
    )


class PostImage(Base):
    __tablename__ = "PostImage"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    PostID: Mapped[int] = mapped_column(Integer, ForeignKey("Post.ID"))
    image: Mapped[str] = mapped_column(String)

    post: Mapped["Post"] = relationship("Post", back_populates="images")


class Likes(Base):
    __tablename__ = "Likes"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    UserID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    PostID: Mapped[int] = mapped_column(Integer, ForeignKey("Post.ID"))

    LikeUser = relationship("User", back_populates="likes")
    LikePost = relationship("Post", back_populates="likes")


class Comments(Base):
    __tablename__ = "Comments"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    PostID: Mapped[int] = mapped_column(Integer, ForeignKey("Post.ID"))
    ParentCommentID: Mapped[int] = mapped_column(
        Integer, ForeignKey("Comments.ID"), nullable=True
    )
    CommenterID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    Date: Mapped[DateTime] = mapped_column(DateTime)
    Comment: Mapped[str] = mapped_column(String)

    CommentUser = relationship("User", back_populates="comments")
    CommentPost = relationship("Post", back_populates="comments")
    ParentCommenter = relationship("Comments", remote_side=[ID], backref="Replies")


class follows(Base):
    __tablename__ = "Follows"

    ID: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    FollowerID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    FollowedID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
