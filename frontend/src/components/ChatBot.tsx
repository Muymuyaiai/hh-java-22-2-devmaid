import {ChangeEvent, FormEvent, useState} from "react";

type ChatBotProps = {
    getChatBotAnswer: (request: string) => string
}
export default function ChatBot(props: ChatBotProps){
    const [chatLog, setChatLog] = useState("")
    const [chatInput, setChatInput] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setChatLog(chatLog + "!\nYou: " + chatInput + "\nMarv: " + props.getChatBotAnswer(chatInput))
    }

    const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
        setChatInput(event.target.value)
    }

    return (
        <form className={"chatbot"} onSubmit={handleSubmit}>
            <label>
                <textarea value={chatLog}/>
            </label>
            <label>
                <input type={"submit"} name={"input"} value={chatInput} onInput={handleChatInput}/>
            </label>

        </form>
    )
}