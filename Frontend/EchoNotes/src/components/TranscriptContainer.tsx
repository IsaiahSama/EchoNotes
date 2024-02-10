import React, { useContext } from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonInput, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { TranscriptContext } from "../TranscriptContext";
import HeaderContainer from "./HeaderContainer";

interface ContainerProps { }

const TranscriptContainer: React.FC<ContainerProps> = () => {
    const transcriptContext = useContext(TranscriptContext)

    if (!transcriptContext) {
        throw new Error("TranscriptContainer must be used within a TranscriptProvider")
    }

    const {transcript, setTranscript} = transcriptContext

    return (
        <>
        <HeaderContainer />
        <div className="transcriptContainer">
            <div className="transcriptContainer__left">
                    <h2>LLM Conversation Area</h2>
                    <div id="chatArea" className="transcriptContainer__chat_area">
                        <div className="aiMessage message">Beep</div>
                        <div className="message userMessage">Bop</div>
                    </div>
                    <IonInput placeholder="Chat with the AI here"></IonInput>
            </div>
            <div className="transcriptContainer__right">
                <h2>Transcribed Transcript</h2>
                <div className="transcriptContainer__transcriptArea" id="transcriptArea">
                    {transcript}
                </div>
            </div>
        </div>
        </>
    )
}

export default TranscriptContainer