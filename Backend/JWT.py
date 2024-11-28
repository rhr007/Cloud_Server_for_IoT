import jwt
from datetime import datetime, timezone, timedelta

from SECRETS_INFO import jwt_info

SECRET_KEY = jwt_info.get_secret_key()
ALGORITHM = jwt_info.get_algorithm()
ACESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt