from random import choice
import socketio

from typing import Annotated
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from transcribe import recognize

app = FastAPI()

origins = ["http://localhost:8100"]

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])

socket_app = socketio.ASGIApp(sio)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

app.mount("/socket.io", socket_app)

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

@sio.on("connect")
async def connect(sid:int, environ, auth):
    print("Client connected")

@sio.on("disconnect")
async def disconnect(sid:int):
    pass
