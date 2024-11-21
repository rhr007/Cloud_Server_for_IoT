from sqlmodel import SQLModel, Field
from pydantic import EmailStr

from datetime import datetime


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True, index=True, default=None)
    first_name: str
    last_name: str
    email: EmailStr = Field(unique=True)
    is_active: bool = Field(default=False)
    password: str
    institution: str
    is_admin: bool = Field(default=False)

    ac_created: datetime