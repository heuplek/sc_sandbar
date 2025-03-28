from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.services import get_tide_times
from pydantic import BaseModel, Field


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET,POST"],
    allow_headers=["*"]
)

class TideItem(BaseModel):
    month: int
    year: int
    weekdayIdealLow: float
    weekendIdealLow: float


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your backend."}

@app.post("/tides")
async def create_item(tideItem: TideItem):
    return get_tide_times(
        tideItem.year, 
        tideItem.month, 
        tideItem.weekdayIdealLow, 
        tideItem.weekendIdealLow)