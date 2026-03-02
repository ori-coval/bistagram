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
    image_url: str
    caption: str
    creator_id: int


class PostDisplay(BaseModel):
    id: int
    image_url: str
    caption: str
    timestamp: datetime
    user: UserDisplay
    