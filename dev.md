# Echo Notes Dev
This file is where the Developer notes for the application will be made and stored.

## Frontend Design
Frontend should sport an SPA (Single Page Application) making use of React and React Components.

### Pages
- Sign Up / login page (later using google account)  
- Help / FAQ Page
- Home page  
    1. Upload Audio Section
    2. Original Transcription Display
    3. Modified Transcription Display
    4. LLM Interface for modifying transcription

[Wireframe 1](https://wireframe.cc/LQm5JQ)

## Backend Design
Backend should be responsibe for the following tasks:

- User Identification (Probably Session Storage)
- Transcription Service
- LLM Service
- Database Connection

### Endpoints
- Login / Sign Up
- Transcription (Accepts an audio stream)
- LLM Service (Will use websockets for conversation)