import React, {createContext, useState} from "react"

interface TranscriptContextType {
    transcript: string;
    setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

interface TranscriptProviderProps {
    children: React.ReactNode
}

export const TranscriptContext = createContext<TranscriptContextType | undefined>(undefined);

export const TranscriptProvider: React.FC<TranscriptProviderProps> = ( {children} ) => {
    const [transcript, setTranscript] = useState("");

    let state = {
        transcript,
        setTranscript
    }

    return <TranscriptContext.Provider value={state}>{children}</TranscriptContext.Provider>
};