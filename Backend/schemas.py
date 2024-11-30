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

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    # email: EmailStr
    # is_admin: bool
    id: int

class OTPBody(BaseModel):
    email: EmailStr
    otp: str

class ProjectCreateBody(BaseModel):
    title: str
    number_of_sensors: int
    name_of_sensors: list
    data_type_of_sensors: list
    created: datetime