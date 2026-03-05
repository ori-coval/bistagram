from pydantic import BaseModel


class PostBase(BaseModel):
    Description: str
    Image: str


class SignUp(BaseModel):
    username: str
    password: str


class ProfilePicture(BaseModel):
    image: str


class ProfileBio(BaseModel):
    Bio: str


class CommentBase(BaseModel):
    PostID: int
    Comment: str
    ParentCommentID: int | None = None


class followBase(BaseModel):
    Username: str
