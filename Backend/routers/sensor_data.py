from typing import List
from fastapi import APIRouter, Depends, Request
from sqlmodel import Session
from starlette.datastructures import QueryParams
from database import get_db
import schemas, models

router = APIRouter(prefix="/push-data", tags=["Read & Write Sensor Data"])

@router.get("/")
def test():
    return "Hello"

@router.get("/push/{porject_key}")
def send_data_to_database(projectKey: str, sensorData: str, db: Session = Depends(get_db)):
    project_id = int(projectKey[7])
    project_info = db.get(models.Project, project_id)

    sensor_names = project_info.name_of_sensors

    # return sensor_names
    sensor_names = sensor_names.strip("[]").replace("'", "").replace(" ", "").lower()
    sensor_names = sensor_names.split(",")
    return sensor_names
    return project_id




@router.post("/test")
def test(request:Request, request_body:schemas.WriteSensor, db:Session=Depends(get_db)):
    sensor = models.Sensor.model_validate(request_body)
    db.add(sensor)
    db.commit()
    db.refresh(sensor)
    # params = request.query_params
    # params = dict(params)
    # print(list(params.values()))
    return sensor