import axios from "axios";
import TranslationReq from "../model/TranslationReq";
import {useState} from "react";
import CompileReq from "../model/CompileReq";
import ChatBotReq from "../model/ChatBotReq";

export default function UseHooks() {
    const [translationRes, setTranslationRes] = useState("")
    const [compileRes, setCompileRes] = useState("")
    const [chatBotRes, setChatBotRes] = useState("")

    const Buffer = require('buffer/').Buffer

    const decode = (data: string) => {
        let buff = new Buffer(data, 'base64')
        return buff.toString('utf8')
    }

    const encode = (data: string) => {
        let buff = new Buffer(data)
        return buff.toString('base64')
    }

    function getCodeTranslation (request: TranslationReq) {
        setTranslationRes("Loading...")
        return axios.post("/api/gpt3", request)
            .then((response) => response.data)
            .then(setTranslationRes)
            .catch((error) => console.error(error))
    }

    const getCodeCompile = (request: CompileReq) => {
        setCompileRes("Compiling...")
        request.source_code = encode(request.source_code)
        request.stdin = encode(request.stdin)
        setCompileRes("Compiling...")
        axios.post("/api/compiler", request)
            .then((response) => response.data)
            .then((data) =>setCompileRes(decode(data)))
            .catch((error) => console.error(error))
    }

    const getChatBotAnswer = (request: ChatBotReq) => {
        setChatBotRes("...")
        axios.post("/api/gpt3/marv", request)
            .then((response) => response.data)
            .then(setChatBotRes)
            .catch((error) => console.error(error))
    }



    return {getCodeTranslation, getCodeCompile, getChatBotAnswer, setTranslationRes, compileRes, translationRes, chatBotRes}
}