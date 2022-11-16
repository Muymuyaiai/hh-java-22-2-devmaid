import './Translation.css';
import React, {ChangeEvent, useState} from "react";
import TranslationReq from "../model/TranslationReq";
import { FaPlay, FaFolderOpen, FaSave } from 'react-icons/fa';
import {UserInfo} from "../model/UserInfo";
import User from "../model/User";
import UserDTO from "../model/UserDTO";

type TranslationProps = {
    me: UserInfo
    user: User | undefined
    translationRes: string
    getUser: (username: string) => void
    getCodeTranslation: (request: TranslationReq) => void
    updateUser: (updatedUser: UserDTO) => void
    setTranslationRes: React.Dispatch<React.SetStateAction<string>>
}

export default function Translation(props: TranslationProps) {
    const [translSaveDropdown, setTranslSaveDropdown] = useState(false)
    const [translLoadDropdown, setTranslLoadDropdown] = useState(false)
    const [saveName, setSaveName] = useState("")

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

    const toggleSaveDropdown = () => {
        setTranslSaveDropdown(!translSaveDropdown)
    }

    const toggleLoadDropdown = () => {
        setTranslLoadDropdown(!translLoadDropdown)
        props.getUser(props.me.username)
    }

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setSaveName(event.target.value)
    }

    const handleTranslSave = (event: any) => {
        if (event.key === 'Enter') {
            if (!saveName) {
                alert("Please enter a name to save!")
            } else if (props.user?.translations?.map((transl) => transl.name === saveName)) {
                alert("Name already exists!")
            }else {
                let updatedUser: User = {
                    username: props.me.username,
                    translations: [{name: saveName, srcLang: translationReq.srcLang, tarLang: translationReq.tarLang, srcText: translationReq.text, resText:props.translationRes}]
                }
                props.updateUser(updatedUser)
            }
            toggleSaveDropdown()
            setSaveName("")
        }
    }

    const handleTranslLoad = (event: React.MouseEvent<HTMLLIElement>,srcLang: string, tarLang: string, srcText: string, resText: string) => {
        translationReq.srcLang = srcLang
        translationReq.tarLang = tarLang
        translationReq.text = srcText
        props.setTranslationRes(resText)
        toggleLoadDropdown()
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
                <div className="save">
                    <FaSave onClick={toggleSaveDropdown}/>
                </div>
                <div className={"load"}>
                    <FaFolderOpen  onClick={toggleLoadDropdown}/>
                </div>
            </div>
            <textarea name={"text"} value={translationReq.text} onInput={handleChangeText}
                      placeholder={"Source Text"}/>
            <textarea readOnly name={"result"} value={props.translationRes} placeholder={"Output"}/>
            {translSaveDropdown &&
                <ul  className="transl-save-dd-menu">
                    <li>
                        <input value={saveName} autoFocus onBlur={() => toggleSaveDropdown()} onInput={handleChangeName} onKeyDown={handleTranslSave}/>
                    </li>
                </ul>
            }
            {translLoadDropdown &&
                <ul onBlur={() => toggleLoadDropdown()} className="transl-save-dd-menu">
                    {props.user?.translations?.map((transl) =>
                        <li key={transl.name} onClick={(e) =>
                            handleTranslLoad(e, transl.srcLang, transl.tarLang, transl.srcText, transl.resText)}>{transl.name + " | " + transl.srcLang + " -> " + transl.tarLang}</li>)}
                </ul>
            }
        </div>
    );
}