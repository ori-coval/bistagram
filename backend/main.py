from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.session import Session
from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List

from db import db_handler
from db.database import get_db
app = FastAPI()

@app.get("")
def root():
    return "Hello World"

origins = [
    'http://localhost:3000'
]

@app.get('/user/{user_id}/posts')
def posts(user_id: int, db: Session = Depends(get_db)):
    return db_handler.get_all_posts_by_user(db, user_id=user_id)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
