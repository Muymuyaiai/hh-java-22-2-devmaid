import './ChatBot.css';
import React, {ChangeEvent, useState} from "react";
import ChatBotReq from "../model/ChatBotReq";
import { FaPaperPlane } from 'react-icons/fa';


type ChatBotProps = {
    getChatBotAnswer: (request: ChatBotReq) => void
    chatBotRes: string
}
export default function ChatBot(props: ChatBotProps) {
    const [chatLog, setChatLog] = useState("")
    const [chatBotReq, setChatBotReq] = useState<ChatBotReq>({prompt: ""})


    const handleSubmit = () => {

        props.getChatBotAnswer(chatBotReq)
        setChatLog(chatLog + props.chatBotRes)
        setChatLog(chatLog + props.chatBotRes + "\nYou: " + chatBotReq.prompt + "\nMarv: ")
        setChatBotReq({prompt: ""})
    }

    const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
        setChatBotReq({prompt: event.target.value})
    }

    return (
        <div>
            <div>Marv</div>
            <textarea readOnly id={"output"} value={chatLog + props.chatBotRes}/>
            <div className="input-chat">
                <div>
                <input
                    type={"text"}
                    value={chatBotReq.prompt}
                    onInput={handleChatInput}
                />
                </div>
                <div className={"send"}>
                    <FaPaperPlane onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}