import React, { useContext, useEffect, useRef, useState } from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonInput } from "@ionic/react";
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
        setMessages(prevMessages => [new MessageObj("ai", "Beep"), new MessageObj("user", "Bop")])
        
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

    const sendMessage = (text: string) => {
        if(socketRef.current){
            socketRef.current.emit('message', {data: text})
        } else{
            console.log("Something happened")
        }
    }

    const submitUserMessage = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        sendMessage(value)
        setMessages(prevMessages => [...prevMessages, new MessageObj("user", value)])
    } 

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
                    <IonInput
                        placeholder="Chat with the AI here"
                        onIonChange={(event) => submitUserMessage(event)}
                        clearOnEdit={true}
                        clearInput={true}
                    ></IonInput>
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