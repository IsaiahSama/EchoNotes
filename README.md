# EchoNotes

EchoNotes is a full stack application designed to transcribe provided audio recordings, and provide an LLM interface for easier user consumption.

## How it works
- Allows users to upload a file for transcription
- Uploaded file will be transcribed by the backend, and stored.
- LLM will be prompted with the transcript, and a connection established for further prompting
- User can then export the final document and use it as they please.