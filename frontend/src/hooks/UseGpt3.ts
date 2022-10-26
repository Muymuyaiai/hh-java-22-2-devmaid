import axios from "axios";
import TranslationReq from "../model/TranslationReq";
import {useState} from "react";

export default function useGpt3() {
    const [translationRes, setTranslationRes] = useState("")

    const getCodeTranslation = (newRequest: TranslationReq) => {
        axios.post("/api/gpt3", newRequest)
            .then((response) => response.data)
            .then(setTranslationRes)
            .catch((error) => console.error(error))
    }

    return {translationRes, getCodeTranslation}
}