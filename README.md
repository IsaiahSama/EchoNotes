# EchoNotes

EchoNotes is a full stack application designed to transcribe provided audio recordings, and provide an LLM interface for easier user consumption.

## How it works
- Allows users to upload a file for transcription
- Uploaded file will be transcribed by the backend, and stored.
- LLM will be prompted with the transcript, and a connection established for further prompting
- User can then export the final document and use it as they please.

# How to set it up.
1) Clone the repository [here](https://github.com/IsaiahSama/EchoNotes)  
2) In the backend folder, create a virtual environment (if you please), and run the command  
```sh
pip install -r requirements.txt
```
This will install the dependencies the server needs.   
3) In the frontend folder, run the command   
```sh
npm i
```
This will install the dependencies the frontend needs.  
4) Clone the `.env.example` file and name it `.env`.   
5) Go to Open AI and create an API key [here](https://platform.openai.com/api-keys)   
6) Once you have the key, place it in the `.env` file, replacing the "API_KEY_HERE" string.   
7) From here, in one terminal in the frontend folder, run the command: `ionic serve`  
8) In another terminal in the backend folder, run the command: `uvicorn.exe app:app`  
9) Visit the webpage here at http://localhost:8100/home/  
10) The audio to upload must be in the `wav file` format. Upload it, and have fun!  