from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import BLOB, Text


class PostBase(BaseModel):
    UserID: int
    Description: str
    image: str
