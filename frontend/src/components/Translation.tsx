import './Translation.css';
import React, {ChangeEvent, useState} from "react";
import TranslationReq from "../model/TranslationReq";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faFileArrowUp, faFileArrowDown} from '@fortawesome/free-solid-svg-icons'

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
                <div className={"compile"}>
                    <FontAwesomeIcon onClick={handleSubmit} icon={faPlay} size={"1x"}/>
                </div>
                <div className={"bracket"}> | </div>
                <div className={"save"}>
                    <FontAwesomeIcon onClick={handleSubmit} icon={faFileArrowUp} size={"1x"}/>
                </div>
                <div className={"save"}>
                    <FontAwesomeIcon onClick={handleSubmit} icon={faFileArrowDown} size={"1x"}/>
                </div>
            </div>
            <textarea name={"text"} value={translationReq.text} onInput={handleChangeText}
                      placeholder={"Source Text"}/>
            <textarea readOnly name={"result"} value={props.translationRes} placeholder={"Output"}/>
        </div>
    );
}