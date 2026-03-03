from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.session import Session
from fastapi import Depends
from sqlalchemy.orm import Session
from db import db_handler
from db.database import get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("")
def root():
    return "Hello World"


@app.get("/user/{user_id}/posts")
def posts(response: Response, user_id: int, db: Session = Depends(get_db)):
    return db_handler.get_all_posts_by_user(db, user_id=user_id)


@app.post("/upload-post")
def create(
    response: Response, request: db_handler.PostBase, db: Session = Depends(get_db)
):
    return db_handler.create_post(db, request)
