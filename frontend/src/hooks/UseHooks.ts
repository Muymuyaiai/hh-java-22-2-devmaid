import axios from "axios";
import TranslationReq from "../model/TranslationReq";
import {useState} from "react";
import CompileReq from "../model/CompileReq";

export default function useHooks() {
    const [translationRes, setTranslationRes] = useState("")
    const [compileRes, setCompileRes] = useState("")

    const getCodeTranslation = (newRequest: TranslationReq) => {
        axios.post("/api/gpt3", newRequest)
            .then((response) => response.data)
            .then(setTranslationRes)
            .catch((error) => console.error(error))
    }

    const getCodeCompile = (newRequest: CompileReq) => {
        axios.post("/api/compiler", newRequest)
            .then((response) => response.data)
            .then(setCompileRes)
            .catch((error) => console.error(error))
    }

    return {getCodeTranslation, getCodeCompile, compileRes, translationRes}
}