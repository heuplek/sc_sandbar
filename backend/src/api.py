from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.services import get_tide_times
from pydantic import BaseModel, Field



app = FastAPI()

origins = [
    "216.24.60.0/24"
    "https://216.24.60.0/24",
    "https://battery-creek-sandbar.onrender.com",
    "http://battery-creek-sandbar.onrender.com",
    "https://216.24.60.0/24"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TideItem(BaseModel):
    month: int
    year: int
    weekdayIdealLow: float
    weekendIdealLow: float


@app.options('/tides', status_code=200)
def root_options():
    print("OPTIONS request received at root")
    return {"message": "received"}  # Preflight request for CORS


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