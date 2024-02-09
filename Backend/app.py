from fastapi import FastAPI, UploadFile
from transcribe import recognize

app = FastAPI()

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
async def transcribe(audioFile: UploadFile):
    file = audioFile.file
    results = recognize(file)
    return results

@app.get("/v1/converse/")
async def converse():
    pass