import React from "react";
import "./TranscriptContainer.css"
import '@ionic/react/css/core.css';
import { IonInput, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";


interface ContainerProps { }

const TranscriptContainer: React.FC<ContainerProps> = () => {
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
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                    <div className="aiMessage message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis sint dolores similique, adipisci iusto cum.</div>
                                </div>
                                <IonInput placeholder="Chat with the AI here"></IonInput>
                        </div>
                    </IonCol>
                    <IonCol size="3">
                        <div className="transcriptContainer__right">
                            <h2>Transcribed Transcript</h2>
                            <div className="transcriptContainer__transcriptArea" id="transcriptArea">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum non maiores totam laboriosam harum quam recusandae dolores nostrum velit sunt, quas, omnis voluptatem explicabo accusantium minima provident? Deleniti, reiciendis inventore.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum non maiores totam laboriosam harum quam recusandae dolores nostrum velit sunt, quas, omnis voluptatem explicabo accusantium minima provident? Deleniti, reiciendis inventore.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum non maiores totam laboriosam harum quam recusandae dolores nostrum velit sunt, quas, omnis voluptatem explicabo accusantium minima provident? Deleniti, reiciendis inventore.
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}

export default TranscriptContainer