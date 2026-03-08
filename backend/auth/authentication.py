from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from auth.hashing import verify_password
from db.models import User
from db.database import get_db
from sqlalchemy.orm.session import Session
from auth.oauth2 import create_access_token


router = APIRouter(tags=["authentication"])


@router.post("/login")
def login(
    request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.Username == request.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="INVALID_CREDENTIALS"
        )
    if not verify_password(request.password, user.HashedPassword):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="INVALID_CREDENTIALS"
        )
    access_token = create_access_token(data={"Username": user.Username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
