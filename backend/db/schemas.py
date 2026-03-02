from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import BLOB


class PostBase(BaseModel):
    UserID: int
    Description: str
    image: BLOB
