from typing import List
from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select

import pandas as pd
import joblib
from sqlmodel import Session, select
from database import get_db
import models

# from starlette.requests import Request
from database import get_db
import schemas, models
from datetime import datetime


router = APIRouter(tags=["ML"])



# Load the model once at startup
model = joblib.load("model.pkl")

# Sensor ID mapping
sensor_mapping = {
    30: "temperature",
    35: "humidity",
    36: "ph",
    34: "K",
    32: "P",
    33: "rainfall",
    31: "N"
}

@router.get("/predict_crop/{project_id}")
def predict_crop(project_id: int, db: Session = Depends(get_db)):
    try:
        latest_values = {}

        # Fetch the latest value for each required sensor
        for sensor_id, feature_name in sensor_mapping.items():
            sensor_data = db.exec(
                select(models.SensorData.value)
                .where(models.SensorData.sensor_id == sensor_id)
                .order_by(models.SensorData.time.desc())
                .limit(1)
            ).first()

            if sensor_data is not None:
                latest_values[feature_name] = sensor_data
            else:
                latest_values[feature_name] = None  # Handle missing data

        # Check if any required sensor value is missing
        if None in latest_values.values():
            missing_sensors = [key for key, value in latest_values.items() if value is None]
            raise HTTPException(status_code=400, detail=f"Missing sensor values: {missing_sensors}")

        # Convert to DataFrame
        df = pd.DataFrame([latest_values], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        # Make prediction
        prediction = model.predict(df)

        return {"predicted_crop": prediction[0], "sensor_data_used": latest_values}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
