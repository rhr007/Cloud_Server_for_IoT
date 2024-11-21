from sqlmodel import create_engine, Session

DATABASE_URL = "sqlite:///./cloudIOT.db"
engine = create_engine(DATABASE_URL)

def get_db():
    with Session(engine) as db:
        yield db