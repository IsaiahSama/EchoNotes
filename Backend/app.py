from random import choice
import socketio

from typing import Annotated
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from transcribe import recognize
from gptservice import Model

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

# Dictionary maps session ids to llm models
llm_models = {}

@sio.on("connect")
async def connect(sid:int, environ, auth):
    print("User with ID", sid, "has connected")
    await sio.emit("handshake", {"text": "Handshake successful!"})

@sio.on("disconnect")
async def disconnect(sid:int):
    if sid in llm_models:
        del llm_models[sid]
    print("User with ID", sid, "has disconnected")

@sio.on("handshake")
async def handshake(sid:int, data:dict):
    # Create Model for user
    user_model = Model(sid, transcript=data["transcript"])
    llm_models[sid] = user_model

@sio.on("modify")
async def modify(sid:int, data:dict):
    if not sid in llm_models:
        return {"text": "User doesn't have a model."}
    model: Model = llm_models[sid]
    response: str = model.modify_transcript(data['text'])
    await sio.emit("modify", {"text": response})


@sio.on("query")
async def query(sid:int, data:dict):
    if not sid in llm_models:
        return {"text": "User doesn't have a model."}
    model: Model = llm_models[sid]
    print("Making query.")
    response: str = model.query_transcript(data['text'])
    print("Query successful!", response)
    await sio.emit("query", {"text": response})