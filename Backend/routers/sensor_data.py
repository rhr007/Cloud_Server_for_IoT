from typing import List
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from sqlmodel import Session, select

# from starlette.requests import Request
from database import get_db
import schemas, models
from datetime import datetime

router = APIRouter(prefix="/data", tags=["Read & Write Sensor Data"])

@router.get("/{project_id}/sensor_keys")
def write_api_key(project_id: int, db: Session = Depends(get_db)):
    keys = db.exec(select(models.Sensor.sensor_key).where(models.Sensor.project_id == project_id)).all()
    url = "/data/push/?"
    for i in range(len(keys)):
        if i is not len(keys) -1:
            url = url + f"{keys[i]}=YOUR_VALUE&"
        else:
            url = url + f"{keys[i]}=YOUR_VALUE"

    return url

@router.get("/all/{project_id}", response_model=schemas.ProjectSchemaWithData)
def test(project_id: int, db: Session = Depends(get_db)):
    project = db.get(models.Project, project_id)
    print(project)
    if project:
        return project
        sensors = db.exec(select(models.Sensor).where(models.Sensor.project_id == project.id)).all()
        
    return JSONResponse(status_code=404, content={'deatial': 'Not Found'})



@router.get("/push/")
def push_sensor_data(request: Request, db: Session = Depends(get_db)):
    print("Test")
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

@router.get("/{sensor_id}/")
def sensor_data(sensor_id, n: int, db: Session = Depends(get_db)):
    # data = db.exec(select(models.SensorData, models.Sensor).where(models.Sensor.project_id == 13)).all()
    print("OK")
    data = db.exec(select(models.SensorData).limit(n).where(models.SensorData.sensor_id == sensor_id).where(models.SensorData.value != None).order_by(models.SensorData.id.desc())).all()
    return data

@router.get("/graph/{sensor_id}/")
def sensor_data(sensor_id, n: int, db: Session = Depends(get_db)):
    # data = db.exec(select(models.SensorData, models.Sensor).where(models.Sensor.project_id == 13)).all()
    print("OK")
    data = db.exec(select(models.SensorData).limit(n).where(models.SensorData.sensor_id == sensor_id).where(models.SensorData.value != None).order_by(models.SensorData.id)).all()
    return data
    



@router.get("/test/")
def okadf(re: Request):
    print("OK")
    params = re.query_params
    print(params)
    return {"detail": "OK"}

def toFloat(values):
    for i in range(len(values)):
        try:
            values[i] = float(values[i])
        except:
            values[i] = None





# @router.get("/pushhhhhhhhh/{porject_key}")
# def send_data_to_database(projectKey: str, sensorData: str, db: Session = Depends(get_db)):
#     project_id = int(projectKey[7])
#     project_info = db.get(models.Project, project_id)

#     sensor_names = project_info.name_of_sensors

#     # return sensor_names
#     sensor_names = sensor_names.strip("[]").replace("'", "").replace(" ", "").lower()
#     sensor_names = sensor_names.split(",")
#     return sensor_names
#     return project_id




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
