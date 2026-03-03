
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import authentication
from routers import likes
from routers import users, posts
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(likes.router)

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
