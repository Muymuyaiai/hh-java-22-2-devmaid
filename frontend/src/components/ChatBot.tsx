import {ChangeEvent, FormEvent, useState} from "react";
import ChatBotReq from "../model/ChatBotReq";

type ChatBotProps = {
    getChatBotAnswer: (request: ChatBotReq) => void
    chatBotRes: string
}
export default function ChatBot(props: ChatBotProps) {
    const [chatLog, setChatLog] = useState("")
    const [chatBotReq, setChatBotReq] = useState<ChatBotReq>({prompt:""})


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getChatBotAnswer(chatBotReq)
        setChatLog(chatLog + props.chatBotRes)
        setChatLog(chatLog + props.chatBotRes + "\nYou: "+ chatBotReq.prompt + "\nMarv: ")
        setChatBotReq({prompt:""})
    }

    const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
        setChatBotReq({prompt:event.target.value})
    }

    return (
        <div>
            <textarea readOnly value={chatLog + props.chatBotRes}/>
            <form className={"chatbot"} onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    name={"input"}
                    value={chatBotReq.prompt}
                    onInput={handleChatInput}
                />
                <button type={"submit"}>Send</button>
            </form>
        </div>
    )
}