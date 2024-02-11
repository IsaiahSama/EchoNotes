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
    const [action, setAction] = useState<string>("query")

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

        socketRef.current.on("handshake", (data) => {
            console.log(data)
            return null
        })

        socketRef.current.on("message", (data) => {
            console.log("Message received")
            updateMessages(new MessageObj("ai", data['text']))
            return null;
        })

        socketRef.current.on("query", (data) => {
            updateMessages(new MessageObj("ai", data['text']))
            return null;
        })

        socketRef.current.on("modify", (data) => {
            setTranscript(data['text'])
            return null;
        })

        return () => {
            if(socketRef.current){
                socketRef.current.disconnect()
            }
        }
    }, [])

    const sendMessage = (text: string): boolean => {
        if(socketRef.current){
            socketRef.current.emit(action, {text})
            return true
        } else{
            console.log("Something happened")
            return false
        }
    }

    const submitUserMessage = () => {
        const element = document.getElementById("userInput")
        const value = (element as HTMLInputElement).value;
        (element as HTMLInputElement).value = ""
        if (value.trim().length == 0) return false

        sendMessage(value)

        updateMessages(new MessageObj("user", value))
    } 

    const updateMessages = (message: MessageObj) => {
        setMessages(prevMessages => [...prevMessages, message])
    }

    const changeAction = (newAction:string) => {
        if (newAction == "query"){
            updateMessages(new MessageObj("ai", "Your messages will now ask me questions about the transcript."))
        }
        else {
            updateMessages(new MessageObj("ai", "Your messages will now modify the transcript."))
        }
        setAction(newAction)
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
                            onIonChange={() => submitUserMessage()}
                            id="userInput"
                        ></IonInput>
                        <div className="flexed">
                            <IonButton style={{width: "40%"}} onClick={() => changeAction("query")} disabled={action === "query" ? true : false}>Ask Query</IonButton>
                            <IonButton style={{width: "40%"}} onClick={() => changeAction("modify")} disabled={action === "modify" ? true : false}>Modify Transcript</IonButton>
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