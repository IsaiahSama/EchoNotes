import React, { useContext, useEffect, useState } from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonInput, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { TranscriptContext } from "../TranscriptContext";
import HeaderContainer from "./HeaderContainer";

interface ContainerProps { }

const TranscriptContainer: React.FC<ContainerProps> = () => {
    const transcriptContext = useContext(TranscriptContext)

    interface Message {
        sender: string;
        content: string;
    }

    class MessageObj implements Message{
        constructor(public sender: string, public content: string) {}
    }

    const [messages, setMessages] = useState<Message[]>([])

    if (!transcriptContext) {
        throw new Error("TranscriptContainer must be used within a TranscriptProvider")
    }

    const {transcript, setTranscript} = transcriptContext

    useEffect(() => {
        setMessages(prevMessages => [new MessageObj("ai", "Beep"), new MessageObj("user", "Bop")])
    }, [])

    return (
        <>
        <HeaderContainer />
        <div className="transcriptContainer">
            <div className="transcriptContainer__left">
                    <h2>LLM Conversation Area</h2>
                    <div id="chatArea" className="transcriptContainer__chat_area">
                        {
                            messages.map(
                                (msg: MessageObj) => <div className={`message ${msg.sender}Message`}>{msg.content}</div>
                            )
                        }
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