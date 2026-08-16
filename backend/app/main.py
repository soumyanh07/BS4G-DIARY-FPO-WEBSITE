import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import requirements, team

load_dotenv()

# Import models before creating tables
from app import models  # noqa: F401


app = FastAPI(
    title="BS4G Dairy FPO API",
    description=(
        "Backend API for BS4G Dairy FPO "
        "milk requirement collection and team register."
    ),
    version="1.0.0",
)


allowed_origins_raw = os.getenv(
    "ALLOWED_ORIGIN",
    "http://localhost:5173",
)

allowed_origins = [
    origin.strip()
    for origin in allowed_origins_raw.split(",")
    if origin.strip()
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(
        bind=engine,
    )


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "BS4G Dairy FPO API",
    }


app.include_router(
    requirements.router,
)

app.include_router(
    team.router,
)