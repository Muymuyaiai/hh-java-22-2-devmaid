import './CodeEditor.css';
import React, {ChangeEvent, useState} from "react";
import Editor from "@monaco-editor/react";
import {languageOptions} from "./LanguageOptions";
import CompileReq from "../model/CompileReq";
import LanguageOption from '../model/LanguageOption';
import {FaPlay, FaFolderOpen, FaSave} from 'react-icons/fa';
import {UserInfo} from "../model/UserInfo";
import User from "../model/User";

type CodeEditorProps = {
    me: UserInfo
    user: User | undefined
    compileRes: string
    getUser: (username: string) => void
    getCodeCompile: (request: CompileReq) => void
    updateUser: (updatedUser: User) => void
}

const MONACO_OPTIONS = {
    minimap: {
        enabled: false,
    },
    fontSize: 13
}

export default function CodeEditor(props: CodeEditorProps) {
    const [code, setCode] = useState('{\nlet message: string = \'Hello, World!\';\nconsole.log(message);\n}')
    const [language, setLanguage] = useState<LanguageOption>(languageOptions[0])
    const [editorSaveDropdown, setEditorSaveDropdown] = useState(false)
    const [editorLoadDropdown, setEditorLoadDropdown] = useState(false)
    const [saveName, setSaveName] = useState("")

    const handleChange = (newCode: string | undefined) => {
        console.log('onChange', newCode);
        newCode && setCode(newCode)
    }

    const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = languageOptions.find((value: LanguageOption) => value.value === event.target.value)
        newLang && setLanguage(newLang)
        console.log(newLang)
    }

    const handleSubmit = () => {
        props.getCodeCompile({language_id: language.id, source_code: code, stdin: ""})
    }

    const toggleSaveDropdown = () => {
        setEditorSaveDropdown(!editorSaveDropdown)
    }

    const toggleLoadDropdown = () => {
        setEditorLoadDropdown(!editorLoadDropdown)
        props.getUser(props.me.username)
    }

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setSaveName(event.target.value)
    }

    const handleEditorSave = (event: any) => {
        if (event.key === 'Enter') {
            if (!saveName) {
                alert("Please enter a name to save!")
            } else if (props.user?.sourceCodes?.map((code) => code.name === saveName)) {
                alert("Name already exists!")
            }else {
                let updatedUser: User = {
                    username: props.me.username,
                    sourceCodes: [{name: saveName, language: language.name, code: code}]
                }
                props.updateUser(updatedUser)
            }
            toggleSaveDropdown()
            setSaveName("")
        }
    }

    const handleEditorLoad = (event: React.MouseEvent<HTMLLIElement>,language: string, code: string) => {
        setCode(code)
        toggleLoadDropdown()
    }

    return (
        <div>
            <div className="editor-menu">
                <select onChange={handleSelectLanguage}>
                    {languageOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <div className={"actions"}>
                    <div className={"run"}>
                        <FaPlay onClick={handleSubmit}/>
                    </div>
                    <div className="bracket">|</div>
                    <div className="editor-dd-button">
                        <FaSave onClick={toggleSaveDropdown}/>
                    </div>
                    <div className={"editor-dd-button"}>
                        <FaFolderOpen onClick={toggleLoadDropdown}/>
                    </div>
                </div>
            </div>
            <div>
                <Editor
                    width="100%"
                    height="64vh"
                    options={MONACO_OPTIONS}
                    language={language.value}
                    theme="vs-dark"
                    value={code}
                    onChange={handleChange}
                />
                <div>
                    <textarea readOnly value={props.compileRes}/>
                </div>
            </div>
            {editorSaveDropdown &&
                <ul  className="editor-save-dd-menu">
                    <li>
                        <input value={saveName} autoFocus onBlur={() => toggleSaveDropdown()} onInput={handleChangeName} onKeyDown={handleEditorSave}/>
                    </li>
                </ul>
            }
            {editorLoadDropdown &&
                <ul onBlur={() => toggleLoadDropdown()} className="editor-save-dd-menu">
                    {props.user?.sourceCodes?.map((code) =>
                        <li key={code.name} onClick={(e) =>
                            handleEditorLoad(e, code.language, code.code)}>{code.name + " | " + code.language}</li>)}
                </ul>
            }
        </div>
    );
}