import React, { useState, useContext } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonProgressBar, IonRow } from "@ionic/react";
import { TranscriptContext} from "../TranscriptContext";
import {cloudUpload} from 'ionicons/icons'

import "./AudioContainer.css"
import '@ionic/react/css/core.css';
import { FilePicker } from "@capawesome/capacitor-file-picker";
import HeaderContainer from "./HeaderContainer";

interface ContainerProps { }

const AudioContainer: React.FC<ContainerProps> = () => {
    const url = "http://127.0.0.1:8000/"

    enum UploadState {
        NotUploaded,
        Uploading,
        Success,
        Failed,
        ServerFailed
    }

    const transcriptContext = useContext(TranscriptContext)

    if (!transcriptContext) {
        throw new Error("TranscriptContainer must be used within a TranscriptProvider")
    }

    const {transcript, setTranscript} = transcriptContext

    const [isUploaded, setUploaded] = useState(UploadState.NotUploaded)

    const messages = {
        [UploadState.NotUploaded]: <h2>No Audio Uploaded</h2>,
        [UploadState.Uploading]: <IonProgressBar type="indeterminate"></IonProgressBar>,
        [UploadState.Success]: <h2>Audio Uploaded Successfully</h2>,
        [UploadState.Failed]: <h2>Audio Could not be uploaded.</h2>,
        [UploadState.ServerFailed]: <h2>Audio could not be recognized. Try again.</h2>
    }

    const uploadAudio  = async () => {
        setUploaded(UploadState.Uploading)
        let state = UploadState.Failed
        try {
            const result = await FilePicker.pickFiles({
                "types": ["audio/wav"]
            })
            const file = result.files[0]

            const formData = new FormData()

            if (file.blob) {
                const rawFile = new File([file.blob], file.name, {
                    type: file.mimeType,
                })

                formData.append('audio_file', rawFile, file.name)
            }

            const options = {
                method: "POST",
                body: formData
            }

            const res = await fetch(url + "v1/transcribe/", options)
            let res_json = await res.json()

            if (res_json.text == undefined){
                state = UploadState.Failed
            } else{
                state = UploadState.Success
                setTranscript(res_json.text)
            }

        } catch (error) {
            console.log(error)
            setTimeout(() => {
                setUploaded(UploadState.NotUploaded)
            }, 4000)
        }
        finally{
            setTimeout(()=> {
                setUploaded(state)
            }, 1000)
        }
    }

    return (
        <>
            <HeaderContainer />
            <div className="audioContainer" id="container">
                <div className="spacer"></div>
                <div className="audioContainer__left">
                    <div className="inner_content">
                        <div className="audioContainer__info">
                            {messages[isUploaded]}
                        </div>
                        <div className="buttons">
                            <IonButton onClick={uploadAudio} disabled={isUploaded === UploadState.NotUploaded ? false : true}>
                                <IonIcon icon={cloudUpload} slot="start"/>
                                Upload Audio
                            </IonButton>
                            <IonButton routerLink="/home/transcribed" disabled={isUploaded === UploadState.Success ? false : true}>
                                Go to Transcription
                            </IonButton>
                        </div>
                    </div>
                </div>
                <div className="spacer">    </div>
                <div className="audioContainer__right">
                    <h2>Past Transcriptions</h2>
                    <div className="pastTranscriptions">
                        <IonList>
                            <IonItem>Lorem</IonItem> 
                            <IonItem>Ipsum</IonItem> 
                            <IonItem>Dolor</IonItem> 
                            <IonItem>Emmet</IonItem> 
                            <IonItem>Emmet</IonItem> 
                        </IonList>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioContainer;