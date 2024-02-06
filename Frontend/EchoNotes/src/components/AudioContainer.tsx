import React from "react";
import { IonButton, IonIcon } from "@ionic/react";

import {cloudUpload} from 'ionicons/icons'

import "./AudioContainer.css"
import '@ionic/react/css/core.css';

interface ContainerProps { }

const AudioContainer: React.FC<ContainerProps> = () => {
    return (
        <div className="audioContainer" id="container">
            <div className="audioContainer__inner">
                <div className="audioContainer__info">
                    <h2>No Audio Uploaded</h2>
                </div>
                <IonButton >
                    <IonIcon icon={cloudUpload} slot="start"/>
                    Upload Audio
                </IonButton>
            </div>
        </div>
    )
}

export default AudioContainer;