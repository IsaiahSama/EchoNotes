import React, { useContext, useEffect, useRef, useState } from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonButton, IonButtons, IonContent, IonInput } from "@ionic/react";
import { TranscriptContext } from "../TranscriptContext";
import HeaderContainer from "./HeaderContainer";
import io, { Socket } from "socket.io-client";

interface ContainerProps { }

const TranscriptContainer: React.FC<ContainerProps> = () => {
    const transcriptContext = useContext(TranscriptContext)
    const socketRef = useRef<Socket | null>(null)

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
        setMessages(prevMessages => [
            new MessageObj("ai", "Welcome! You can type messages below."),
            new MessageObj("ai", "Press 'Ask Query' to ask a question about the Transcript! This is the default."),
            new MessageObj("ai", "Press 'Modify Transcript' to have the transcript modified."),
        ])
        
        socketRef.current = io("http://127.0.0.1:8000")

        socketRef.current.on("handshake", (data):boolean => {
            console.log(data)
            return true
        })

        socketRef.current.on("message", (data):boolean => {
            console.log("Message received")
            setMessages(prevMessages => [...prevMessages, new MessageObj("ai", data['data'])])
            return true;
        })

        return () => {
            if(socketRef.current){
                socketRef.current.disconnect()
            }
        }
    }, [])

    const sendMessage = (text: string, socketType: string): boolean => {
        if(socketRef.current){
            socketRef.current.emit(socketType, {data: text})
            return true
        } else{
            console.log("Something happened")
            return false
        }
    }

    const submitUserMessage = (type: string) => {
        const element = document.getElementById("userInput")
        const value = (element as HTMLInputElement).value;
        (element as HTMLInputElement).value = ""
        if (value.trim().length == 0) return false

        sendMessage(value, type)

        setMessages(prevMessages => [...prevMessages, new MessageObj("user", value)])
    } 

    return (
        <>
        <HeaderContainer />
        <IonContent>
            <div className="transcriptContainer">
                <div className="transcriptContainer__left">
                        <h2>LLM Conversation Area</h2>
                        <div className="transcriptContainer__chat_area">
                            {
                                messages.map(
                                    (msg: MessageObj) => <div className={`message ${msg.sender}Message`}>{msg.content}</div>
                                )
                            }
                        </div>
                        <IonInput
                            placeholder="Chat with the AI here"
                            // onIonChange={() => submitUserMessage("query")}
                            id="userInput"
                        ></IonInput>
                        <div className="flexed">
                            <IonButton style={{width: "40%"}} onClick={() => submitUserMessage("query")}>Ask Query</IonButton>
                            <IonButton style={{width: "40%"}} onClick={() => submitUserMessage("modify")}>Modify Transcript</IonButton>
                            <IonButton style={{width: "20%"}} onClick={() => setMessages([])}>Clear Messages</IonButton>
                        </div>
                </div>
                <div className="transcriptContainer__right">
                    <h2>Transcribed Transcript</h2>
                    <div className="transcriptContainer__transcriptArea" id="transcriptArea">
                        {transcript || "No transcript. Return to Upload page."}
                    </div>
                </div>
            </div>
        </IonContent>
        </>
    )
}

export default TranscriptContainer