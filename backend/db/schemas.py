from pydantic import BaseModel


class PostBase(BaseModel):
    UserID: int
    Description: str
    image: str
