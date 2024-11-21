from pydantic import BaseModel, EmailStr

from datetime import datetime


class RegistrationBody(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    institution: str
    ac_created: datetime

class registrationResponse(BaseModel):
    email: EmailStr


class SigninBody(BaseModel):
    email: str
    password: str