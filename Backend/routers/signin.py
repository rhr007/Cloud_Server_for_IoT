from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import datetime

import schemas, models, hashing
from database import get_db
import JWT

router = APIRouter(tags=["Sign In"])

@router.post("/signin")
def account_sign_in(request_body: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.exec(select(models.User).where(models.User.email == request_body.username)).first()
    if not user:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "wrong credentials"})
    if not hashing.verify_password(request_body.password, user.password):
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "wrong credentials"})

    if not user.is_active:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={"message": "not active"})
    
    data = {
        'email': user.email,
        'is_admin': user.is_admin,
        'id': user.id
    }
    
    access_token = JWT.create_access_token(data)
    return schemas.Token(access_token=access_token, token_type="bearer")
    # return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Token"})