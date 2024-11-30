from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/signin")

def get_current_user(token:str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user_id = JWT.verify_token(token, credentials_exception)
    if user_id is None:
        raise credentials_exception
    return user_id