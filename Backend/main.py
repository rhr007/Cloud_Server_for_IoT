from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from pydantic import BaseModel, EmailStr


from database import engine
from routers import registration, signin, otp_actions, projects, active_user, sensor_data, predictions

app = FastAPI(title="BDU Cloud Server Backend")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


app.include_router(registration.router)
app.include_router(signin.router)
app.include_router(otp_actions.router)
app.include_router(projects.router)
app.include_router(active_user.router)
app.include_router(sensor_data.router)
app.include_router(predictions.router)
# app.include_router()