import React, { useState } from "react";
import { IonButton, IonIcon, IonProgressBar } from "@ionic/react";

import {cloudUpload} from 'ionicons/icons'

import "./AudioContainer.css"
import '@ionic/react/css/core.css';

interface ContainerProps { }

const AudioContainer: React.FC<ContainerProps> = () => {

    const [isUploaded, setUploaded] = useState(0)

    const messages = [<h2>No Audio Uploaded</h2>, <IonProgressBar type="indeterminate"></IonProgressBar>, <h2>Audio Uploaded Successfully</h2>]

    const uploadAudio  = () => {
        setUploaded(1)

        setTimeout(() => {
            setUploaded(2)
        }, 4000)
    }

    return (
        <div className="audioContainer" id="container">
            <div className="audioContainer__inner">
                <div className="audioContainer__info">
                    {
                        isUploaded == 0 ? messages[0] : messages[isUploaded]
                    }
                </div>
                <IonButton onClick={uploadAudio} disabled={isUploaded == 0 ? false : true}>
                    <IonIcon icon={cloudUpload} slot="start"/>
                    Upload Audio
                </IonButton>
            </div>
        </div>
    )
}

export default AudioContainer;