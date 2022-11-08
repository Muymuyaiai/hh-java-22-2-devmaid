import './Translation.css';
import React, {ChangeEvent, useState} from "react";
import TranslationReq from "../model/TranslationReq";
import { FaPlay, FaFolderOpen, FaSave } from 'react-icons/fa';


type TranslationProps = {
    translationRes: string
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

    const handleSubmit = () => {
        props.getCodeTranslation(translationReq)
    }

    return (
        <div>
            <div>Translator</div>
            <div className="input-menu">
                <input type={"text"} name={"srcLang"} value={translationReq.srcLang} onInput={handleChangeInput}
                       placeholder={"Source Language"}/>
                <input type={"text"} name={"tarLang"} value={translationReq.tarLang} onInput={handleChangeInput}
                       placeholder={"Target Language"}/>
                <div className={"run"}>
                    <FaPlay onClick={handleSubmit}/>
                </div>
                <div className={"bracket"}> | </div>
                <div className={"save"}>
                    <FaSave onClick={handleSubmit} />
                </div>
                <div className={"load"}>
                    <FaFolderOpen onClick={handleSubmit} />
                </div>
            </div>
            <textarea name={"text"} value={translationReq.text} onInput={handleChangeText}
                      placeholder={"Source Text"}/>
            <textarea readOnly name={"result"} value={props.translationRes} placeholder={"Output"}/>
        </div>
    );
}