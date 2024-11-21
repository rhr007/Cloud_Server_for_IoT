from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from datetime import datetime

import schemas, models, hashing
from database import get_db

router = APIRouter(tags=["Registration"])

@router.post("/registration", response_model=schemas.registrationResponse, status_code=status.HTTP_201_CREATED)
def create_user(request_body: schemas.RegistrationBody, db: Session = Depends(get_db)):
    email_duplicacy = db.exec(select(models.User).where(models.User.email == request_body.email)).first()

    if email_duplicacy:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message" : "already registered"})
    
    request_body.ac_created = get_date_time()
    request_body.password = hashing.get_hash(request_body.password)
    new_user = models.User.model_validate(request_body)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message" : "successful"})





def get_date_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")