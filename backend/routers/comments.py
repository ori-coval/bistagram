from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session
from auth.oauth2 import get_current_user
from db.schemas import CommentBase
from db.models import User
from db.database import get_db
from db import db_handler


router = APIRouter(tags=["comments"])


@router.post("/create-comment")
def create_comment(
    request: CommentBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db_handler.create_comment(db, request, current_user)
