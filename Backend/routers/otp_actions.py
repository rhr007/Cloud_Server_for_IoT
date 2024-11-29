from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from sqlmodel import Session, select

from database import get_db
import otp, schemas, models

router = APIRouter(tags=["OTP-Actions"], prefix="/otp")

@router.get("/send/{email}")
def send(email):
    otp_to_send = otp.get_otp(email)
    send_otp(email, otp_to_send)

@router.post("/verify")
def verify_otp(request_body: schemas.OTPBody, db: Session = Depends(get_db)):
    check = otp.verify_otp(request_body.email, request_body.otp)
    if not check:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "otp not matched"})
    
    user = db.exec(select(models.User).where(models.User.email == request_body.email)).first()
    if not user:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "server error"})
    user.is_active = True
    db.add(user)
    db.commit()
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message" : "account activation successful"})
    





def send_otp(receiver, otp_to_send):
    import smtplib
    sender = "rhr007bdu@gmail.com"
    subject = "OTP From BDU Cloud Server."
    message = f"Your OTP is {otp_to_send}, it will expire in 2 minutes.\nThank you,\nTeam BDU Cloud Server."

    text = f"Subject: {subject}\n\n{message}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(sender, "nilf bzfh fspg ufwa")

    server.sendmail(sender, receiver, text)
