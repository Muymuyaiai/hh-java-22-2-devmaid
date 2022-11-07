import './CodeEditor.css';
import React, {useState} from "react";
import Editor from "@monaco-editor/react";
import {languageOptions} from "./LanguageOptions";
import CompileReq from "../model/CompileReq";
import LanguageOption from '../model/LanguageOption';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faFileArrowUp, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'


type CodeEditorProps = {
    compileRes: string
    getCodeCompile: (request: CompileReq) => void
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

    const handleChange = (newCode: string | undefined) => {
        console.log('onChange', newCode);
        newCode && setCode(newCode)
    }

    const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = languageOptions.find((value: LanguageOption) => value.value === event.target.value)
        newLang && setLanguage(newLang)
        console.log('language:', newLang);
    }
    const handleSubmit = () => {

        props.getCodeCompile({language_id: language.id, source_code: code, stdin: ""})
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
            </div>
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
    );
}