from email.mime import audio

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm.session import Session
from fastapi import Depends
from sqlalchemy.orm import Session
from auth import authentication
from auth.oauth2 import get_current_user
from routers import users, posts
from db.schemas import UserAuth
from db import db_handler
from db.database import get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(posts.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
def root():
    return "Hello World"
