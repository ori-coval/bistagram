from pydantic import BaseModel
from datetime import datetime
import sqlalchemy
import string
from typing import List

class UserBase(BaseModel):
    username: str 
    password: str

   
class UserDisplay(BaseModel):
    username: str 
    bio: str
    profile_picture_url: str


class PostBase(BaseModel):
    ID: int
    UserID: int
    Date: datetime
    Description: str


class PostDisplay(BaseModel):
    id: int
    user_id: int
    timestamp: datetime
    caption: str

    class Config:
        from_attributes = True  # Pydantic v2
    