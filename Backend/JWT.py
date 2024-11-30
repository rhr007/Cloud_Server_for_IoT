import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timezone, timedelta

from SECRETS_INFO import jwt_info
import schemas

SECRET_KEY = jwt_info.get_secret_key()
ALGORITHM = jwt_info.get_algorithm()
ACESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: int = payload.get("id")
        if id is None:
            raise credentials_exception
        # token_data = schemas.TokenData(id=id)
    except InvalidTokenError:
        raise credentials_exception
    # user = get_user(fake_users_db, username=token_data.username)
    return id