import pydantic
from typing import List
from sqlalchemy.sql.schema import ForeignKey
from .database import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class User(Base):
    __tablename__ = "User"
    ID: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    Username: Mapped[str] = mapped_column(String, unique=True, index=True)
    HashedPassword: Mapped[str] = mapped_column(String)
    Bio : Mapped[str] = mapped_column(String)
    ProfileImage : Mapped[str] = mapped_column(String)

class Post(Base):
    __tablename__ = "Post"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    UserID: Mapped[int] = mapped_column(Integer, ForeignKey("User.ID"))
    Date: Mapped[DateTime] = mapped_column(DateTime)
    Description: Mapped[str] = mapped_column(String)
       

class PostImage(Base):
    __tablename__ = "PostImage"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    post_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("Post.ID") 
    )
    image: Mapped[str] = mapped_column(String)