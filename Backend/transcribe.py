"""This file will be responsible for the transcription of an Audio file provided and returns a string."""

import speech_recognition as sr

from tempfile import SpooledTemporaryFile

def recognize(audio_stream: SpooledTemporaryFile) -> dict:
    """Function used to attempt to turn an audio recording into a transcript.
    
    Args:
        audio_stream (SpooledTemporaryFile): The audio source to process.
        
    Returns:
        Dict indicating status of translation"""
    
    r = sr.Recognizer()
    with sr.AudioFile(audio_stream) as source:
        audio = r.record(source)

    try:
       text =  r.recognize_google(audio)
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return {"error": "Audio could not be understood. Try again"}
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return {"error": e}
    return {"text": text}

if __name__ == "__main__":
    res = recognize("test.mp3")
    if "text" in res:
        print(res)
    else:
        print(res['error'])