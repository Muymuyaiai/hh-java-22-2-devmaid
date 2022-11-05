import axios from "axios";
import TranslationReq from "../model/TranslationReq";
import {useEffect, useState} from "react";
import CompileReq from "../model/CompileReq";
import ChatBotReq from "../model/ChatBotReq";

export default function useHooks() {
    const [translationRes, setTranslationRes] = useState("")
    const [compileRes, setCompileRes] = useState("")
    const [chatBotRes, setChatBotRes] = (useState(""))

    useEffect(() => {

    })

    function getCodeTranslation (newRequest: TranslationReq) {
        setTranslationRes("Loading...")
        return axios.post("/api/gpt3", newRequest)
            .then((response) => response.data)
            .then(setTranslationRes)
            .catch((error) => console.error(error))
    }

    const getCodeCompile = (newRequest: CompileReq) => {
        setCompileRes("Compiling...")
        axios.post("/api/compiler", newRequest)
            .then((response) => response.data)
            .then(setCompileRes)
            .catch((error) => console.error(error))
    }

    const getChatBotAnswer = (newRequest: ChatBotReq) => {
        setChatBotRes("...")
        axios.post("/api/gpt3/marv", newRequest)
            .then((response) => response.data)
            .then(setChatBotRes)
            .catch((error) => console.error(error))
    }



    return {getCodeTranslation, getCodeCompile, getChatBotAnswer, compileRes, translationRes, chatBotRes}
}