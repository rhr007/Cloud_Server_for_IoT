import pyotp, base64

def get_otp(secret_key):
    # base64_secret = base64.b64encode(secret_key.encode()).decode()
    base64_secret = base64.b32encode(secret_key.encode())
    otp = pyotp.TOTP(base64_secret, interval=60*3)

    return otp.now()

def verify_otp(secret_key, otp):
    # base64_secret = (base64.b64encode(secret_key.encode("ascii"))).decode("ascii")
    base64_secret = (base64.b32encode(secret_key.encode()))
    totp = pyotp.TOTP(base64_secret, interval=60*3)

    return totp.verify(otp)

get_otp("3")
print(verify_otp("user", "123456"))