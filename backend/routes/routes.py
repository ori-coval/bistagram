import json

from fastapi import APIRouter, Depends, status, File, UploadFile
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
# from schemas import PostBase, PostDisplay, UserAuth
from backend.routes.schemas import PostDisplay
from db.database import get_db
from db import db_handler
from typing import List
import random
import string
import shutil
# from routers.schemas import UserAuth
# from auth.oauth2 import get_current_user

router = APIRouter()

image_url_types = ['absolute', 'relative']

# @router.post('', response_model=PostDisplay)
# def create(request: PostBase, db: Session = Depends(get_db)):
#     return db_handler.create(db, request)
        
@router.get('/user/{user_id}/posts', response_model=List[PostDisplay])
def posts(user_id: int, db: Session = Depends(get_db)):
    posts = []
    for post in db_handler.get_all_posts_by_user(db, user_id=user_id):
        posts.append({    
                      "id":post.id,
    "timestamp":post.timestamp,
    "user_id": post.user_id,
    "author": post.author.username,
    "images": post.images,})
    return json.dumps(posts)

# @router.post('/image')
# def upload_image(image: UploadFile = File(...)):
#     letters = string.ascii_letters
#     rand_str = ''.join(random.choice(letters) for i in range(6))
#     new = f'_{rand_str}.'
#     filename = new.join(image.filename.rsplit('.', 1))
#     path = f'images/{filename}'

#     with open(path, "w+b") as buffer:
#             shutil.copyfileobj(image.file, buffer)
#     return {'filename': path}