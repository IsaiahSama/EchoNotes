import React, { useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonProgressBar, IonRow } from "@ionic/react";

import {cloudUpload} from 'ionicons/icons'

import "./AudioContainer.css"
import '@ionic/react/css/core.css';
import { FilePicker } from "@capawesome/capacitor-file-picker";

interface ContainerProps { }

const AudioContainer: React.FC<ContainerProps> = () => {

    const url = "http://127.0.0.1:8000/"

    enum UploadState {
        NotUploaded,
        Uploading,
        Success,
        Failed
    }

    const [isUploaded, setUploaded] = useState(UploadState.NotUploaded)

    const messages = {
        [UploadState.NotUploaded]: <h2>No Audio Uploaded</h2>,
        [UploadState.Uploading]: <IonProgressBar type="indeterminate"></IonProgressBar>,
        [UploadState.Success]: <h2>Audio Uploaded Successfully</h2>,
        [UploadState.Failed]: <h2>Audio Could not be uploaded.</h2>
    }

    const uploadAudio  = async () => {
        setUploaded(UploadState.Uploading)
        let state = UploadState.Failed
        try {
            const result = await FilePicker.pickFiles({
                "types": ["audio/mp3"]
            })
            const file = result.files[0]

            const formData = new FormData()

            if (file.blob) {
                const rawFile = new File([file.blob], file.name, {
                    type: file.mimeType,
                })

                formData.append('audio_file', rawFile, file.name)
                console.log(formData)
                state = UploadState.Success
            }

            const options = {
                method: "POST",
                body: formData
            }

            const res = await fetch(url + "v1/transcribe/", options)
            let res_json = await res.json()

            console.log(res_json)

        } catch (error) {
            console.log(error)
            setTimeout(() => {
                setUploaded(UploadState.NotUploaded)
            }, 2000)
        }
        finally{
            setTimeout(()=> {
                setUploaded(state)
            }, 2000)
        }
    }

    return (
        <IonGrid >
            <div className="audioContainer" id="container">
            <IonRow>
                <IonCol>
                    <div className="audioContainer__inner">
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
                </IonCol>
                <IonCol size="3">
                    <h2>Past Transcriptions</h2>
                    <IonContent>
                        <IonList>
                            <IonItem>Lorem</IonItem> 
                            <IonItem>Ipsum</IonItem> 
                            <IonItem>Dolor</IonItem> 
                            <IonItem>Emmet</IonItem> 
                            <IonItem>Emmet</IonItem> 
                        </IonList>
                    </IonContent>
                </IonCol>
            </IonRow>
        </div>
        </IonGrid>
    )
}

export default AudioContainer;