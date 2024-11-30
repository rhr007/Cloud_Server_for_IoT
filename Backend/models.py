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



class Project(SQLModel, table=True):
    __tablename__ = "projects"

    id: int = Field(primary_key=True, index=True, default=None)
    user_id: int = Field(foreign_key="users.id", index=True)
    project_key: str | None = Field(default=None)
    title: str
    number_of_sensors: int
    name_of_sensors: str
    data_type_of_sensors: str
    created: datetime
