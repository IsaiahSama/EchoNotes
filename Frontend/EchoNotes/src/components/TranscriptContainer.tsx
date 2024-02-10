import React, { useContext } from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonInput, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { TranscriptContext } from "../TranscriptContext";

interface ContainerProps { }

const TranscriptContainer: React.FC<ContainerProps> = () => {
    const transcriptContext = useContext(TranscriptContext)

    if (!transcriptContext) {
        throw new Error("TranscriptContainer must be used within a TranscriptProvider")
    }

    const {transcript, setTranscript} = transcriptContext

    return (
        <div className="transcriptContainer">
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div className="transcriptContainer__left">
                                <h2>LLM Conversation Area</h2>
                                <div id="chatArea" className="transcriptContainer__chat_area">
                                    <div className="aiMessage message">Beep</div>
                                    <div className="message userMessage">Bop</div>
                                </div>
                                <IonInput placeholder="Chat with the AI here"></IonInput>
                        </div>
                    </IonCol>
                    <IonCol size="3">
                        <div className="transcriptContainer__right">
                            <h2>Transcribed Transcript</h2>
                            <div className="transcriptContainer__transcriptArea" id="transcriptArea">
                                {transcript}
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}

export default TranscriptContainer