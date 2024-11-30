from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from oauth2 import get_current_user

from datetime import datetime
import random, string

import schemas, models
from database import get_db
router = APIRouter(prefix="/project", tags=["Projects"])

@router.post("/")
def create_project(request_body: schemas.ProjectCreateBody, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    request_body.name_of_sensors = str(request_body.name_of_sensors)
    request_body.data_type_of_sensors = str(request_body.data_type_of_sensors)
    request_body.created = get_date_time()
    new_project = dict(request_body)
    new_project["user_id"] = user_id
    # new_project["project_key"] = "Testing"
    data = models.Project.model_validate(new_project)
    # data = models.Project(user_id=user_id, title=request_body.title, number_of_sensors=request_body.number_of_sensors, name_of_sensors=request_body.name_of_sensors, data_type_of_sensors=request_body.data_type_of_sensors, created="2024-04-10")
    db.add(data)
    db.commit()
    project_key = get_project_key(data.id)
    data.project_key = project_key
    db.add(data)
    db.commit()
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"detail": "project created"})



@router.get("/")
def get_all_projects(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    projects = db.exec(select(models.Project).where(models.Project.user_id == user_id)).all()
    if not projects:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={"detail": "no projects"})
    return projects




def get_date_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def get_project_key(id: int):
    res = ''.join(random.choices(string.ascii_uppercase + string.digits, k=7))
    return (res + str(id))