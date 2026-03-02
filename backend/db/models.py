from typing import List
from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base


class User(Base):
    __tablename__ = "User"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    Username: Mapped[str] = mapped_column(String, unique=True, index=True)
    HashedPassword: Mapped[str] = mapped_column(String)
    Bio: Mapped[str] = mapped_column(String)
    ProfileImage: Mapped[str] = mapped_column(String)

    posts: Mapped[List["Post"]] = relationship("Post", back_populates="user")


class Post(Base):
    __tablename__ = "Post"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    UserID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    Date: Mapped[DateTime] = mapped_column(DateTime)
    Description: Mapped[str] = mapped_column(String)

    user: Mapped["User"] = relationship("User", back_populates="posts")
    images: Mapped[List["PostImage"]] = relationship("PostImage", back_populates="post")


class PostImage(Base):
    __tablename__ = "PostImage"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    PostID: Mapped[int] = mapped_column(Integer, ForeignKey("Post.ID"))
    image: Mapped[str] = mapped_column(String)

    post: Mapped["Post"] = relationship("Post", back_populates="images")