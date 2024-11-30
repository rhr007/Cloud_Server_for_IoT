from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse

import schemas, oauth2

def get_current_active_user(user_id:int = Depends(oauth2.get_current_user)):
    if not user_id:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "not authenticated"})
    return user_id

router = APIRouter(tags=["Active-User"])
@router.get("/users/me/")
def read_users_me(current_user = Depends(get_current_active_user)):
    return current_user