from typing import List
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select

from starlette.requests import Request
from database import get_db
import schemas, models
from datetime import datetime

router = APIRouter(prefix="/sensor-data", tags=["Read & Write Sensor Data"])

@router.get("/{project_id}/sensor_keys")
def read_sensor_keys(project_id: int, db: Session = Depends(get_db)):
    keys = db.exec(select(models.Sensor.sensor_key).where(models.Sensor.project_id == project_id)).all()
    url = "/sensor-data/push?"
    for i in range(len(keys)):
        if i is not len(keys) -1:
            url = url + f"{keys[i]}=YOUR_VALUE&"
        else:
            url = url + f"{keys[i]}=YOUR_VALUE"

    return url

@router.get("/read/{project_id}", response_model=schemas.ProjectSchema)
def test(project_id: int, db: Session = Depends(get_db)):
    project = db.get(models.Project, project_id)
    print(project)
    if project:
        return project
        sensors = db.exec(select(models.Sensor).where(models.Sensor.project_id == project.id)).all()
        
    return JSONResponse(status_code=404, content={'deatial': 'Not Found'})
    






@router.get("/pushhhhhhhhh/{porject_key}")
def send_data_to_database(projectKey: str, sensorData: str, db: Session = Depends(get_db)):
    project_id = int(projectKey[7])
    project_info = db.get(models.Project, project_id)

    sensor_names = project_info.name_of_sensors

    # return sensor_names
    sensor_names = sensor_names.strip("[]").replace("'", "").replace(" ", "").lower()
    sensor_names = sensor_names.split(",")
    return sensor_names
    return project_id




# @router.post("/test")
# def test(request:Request, request_body:schemas.WriteSensor, db:Session=Depends(get_db)):
#     sensor = models.Sensor.model_validate(request_body)
#     db.add(sensor)
#     db.commit()
#     db.refresh(sensor)
#     # params = request.query_params
#     # params = dict(params)
#     # print(list(params.values()))
#     return sensor


@router.get("/push")
def push_sensor_data(request: Request, db: Session = Depends(get_db)):
    params = request.query_params
    sensor_keys = list(params.keys())
    sensor_values = list(params.values())
    toFloat(sensor_values)

    for i in range(len(sensor_keys)):
        check_key = db.exec(select(models.Sensor).where(models.Sensor.sensor_key == sensor_keys[i])).first()
        if check_key:
            data = models.SensorData(sensor_id=check_key.id, value=sensor_values[i], time=datetime.now())
            db.add(data)
            db.commit()

    return "Ok"


def toFloat(values):
    for i in range(len(values)):
        try:
            values[i] = float(values[i])
        except:
            values[i] = None
