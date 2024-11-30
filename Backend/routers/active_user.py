from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session

from database import get_db
import schemas, models, oauth2

def get_current_active_user(user_id:int = Depends(oauth2.get_current_user)):
    if not user_id:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "not authenticated"})
    return user_id

router = APIRouter(tags=["Active-User"])
@router.get("/users/me/", response_model= schemas.ActiveUserData)
def read_users_me(db: Session = Depends(get_db), user_id = Depends(get_current_active_user)):
    user = db.get(models.User, user_id)
    return user