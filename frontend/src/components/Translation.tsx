import {ChangeEvent, FormEvent, useState} from "react";
import TranslationReq from "../model/TranslationReq";

type TranslationProps = {
    translationRes: String
    getCodeTranslation: (request: TranslationReq) => void
}

export default function Translation(props: TranslationProps) {

    const emptyTranslationReq: TranslationReq = {
        text: "",
        srcLang: "",
        tarLang: ""
    }

    const [translationReq, setTranslationReq] = useState(emptyTranslationReq)

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTranslationReq(translationReq => ({
            ...translationReq,
            [event.target.name]:
            event.target.value
        }))
    }

    const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTranslationReq(translationReq => ({
            ...translationReq,
            [event.target.name]:
            event.target.value
        }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getCodeTranslation(translationReq)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input type={"text"} name={"srcLang"} value={translationReq.srcLang} onInput={handleChangeInput}/>
            </label>
            <label>
                <textarea name={"text"} value={translationReq.text} onInput={handleChangeText}/>
            </label>
            <label>
                <input type={"text"} name={"tarLang"} value={translationReq.tarLang} onInput={handleChangeInput}/>
            </label>
            <label>
                <textarea readOnly name={"result"} value={props.translationRes.toString()}></textarea>
            </label>
            <button type={"submit"}>Translate</button>
        </form>
    );
}