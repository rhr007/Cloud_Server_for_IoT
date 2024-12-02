from fastapi import APIRouter

router = APIRouter(prefix="/push-data", tags=["Read & Write Sensor Data"])

@router.get("/")
def test():
    return "Hello"