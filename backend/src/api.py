from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.services import get_tide_times
from pydantic import BaseModel, Field
from http import HTTPStatus



app = FastAPI()

origins = [
    "216.24.60.0/24"
    "https://216.24.60.0/24",
    "https://sc-sandbar-fe.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET,POST,OPTIONS"],
    allow_headers=["*"]
)

class TideItem(BaseModel):
    month: int
    year: int
    weekdayIdealLow: float
    weekendIdealLow: float


@app.options('/')
def root_options():
    if request.method == "OPTIONS":
        # Preflight request for CORS
        return HTTPStatus.OK  # Preflight request for CORS


@app.options('/tides')
def tides_options():
    if request.method == "OPTIONS":
        # Preflight request for CORS
        return HTTPStatus.OK


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