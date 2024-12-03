from typing import Any, Dict, Tuple
from sqlmodel import Relationship, SQLModel, Field
from pydantic import EmailStr
from nanoid import generate
from datetime import datetime
from sqlalchemy import event


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

    sensors: list["Sensor"] = Relationship(back_populates="project")


    

class Sensor(SQLModel, table=True):
    __tablename__ = "sensors"

    id: int = Field(primary_key=True, index=True, default=None)
    project_id: int = Field(foreign_key="projects.id", index=True)
    name:str
    sensor_key:str = Field(default=None, nullable=True, unique=True)
    data_type: str

    project: Project | None = Relationship(back_populates="sensors")
    data: list['SensorData'] = Relationship(back_populates="sensor")


class SensorData(SQLModel, table=True):
    __tablename__ = "sensor-data"

    id: int = Field(primary_key=True, index=True, default=None)
    sensor_id: int = Field(foreign_key="sensors.id", index=True)
    value: float | None
    time: datetime

    sensor: Sensor | None = Relationship(back_populates="data")


@event.listens_for(Sensor, "before_insert")
def set_sensor_key(mapper, connection, target):
    if target.sensor_key is None:
        target.sensor_key = target.name.lower().replace(" ", "_") +"_"+ generate(size=5)