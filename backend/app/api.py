from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services import get_tide_times


app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your backend."}

@app.get("/tides")
async def read_item(year: int, month:int):
    return get_tide_times(year, month)