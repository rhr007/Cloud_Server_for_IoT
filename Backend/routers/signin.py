from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from datetime import datetime

import schemas, models, hashing
from database import get_db

router = APIRouter(tags=["Sign In"])

@router.post("/signin")
def account_sign_in(request_body: schemas.SigninBody, db: Session = Depends(get_db)):
    user = db.exec(select(models.User).where(models.User.email == request_body.email)).first()
    if not user:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "wrong credentials"})
    if not hashing.verify_password(request_body.password, user.password):
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "wrong credentials"})
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Token"})