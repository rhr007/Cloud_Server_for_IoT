from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

def get_hash(plain_password):
    return pwd_context.hash(plain_password)