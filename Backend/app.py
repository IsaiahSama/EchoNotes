from typing import Annotated
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transcribe import recognize

app = FastAPI()

origins = ["http://localhost:8100"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/v1/login/")
async def login():
    pass 

@app.get("/v1/register/")
async def register():
    pass 

@app.post("/v1/transcribe/")
async def transcribe(audio_file: Annotated[UploadFile, File()]):
    print("We've been hit!")
    file = audio_file.file
    results = recognize(file)
    return results

@app.get("/v1/converse/")
async def converse():
    pass