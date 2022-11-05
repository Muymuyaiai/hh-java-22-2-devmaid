import './CodeEditor.css';
import React, {FormEvent, useState} from "react";
import Editor from "@monaco-editor/react";
import {languageOptions} from "./LanguageOptions";
import CompileReq from "../model/CompileReq";
import LanguageOption from '../model/LanguageOption';

type CodeEditorProps = {
    compileRes: String
    getCodeCompile: (request: CompileReq) => void
}

export default function CodeEditor(props: CodeEditorProps) {
    const [code, setCode] = useState('{\nlet message: string = \'Hello, World!\';\nconsole.log(message);\n}')
    const [language, setLanguage] = useState<LanguageOption>(languageOptions[0])

    const handleChange = (newCode: string | undefined) => {
        console.log('onChange', newCode);
        newCode && setCode(newCode)
    }

    const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const  newLang = languageOptions.find((value:LanguageOption) => value.value === event.target.value)
        newLang && setLanguage(newLang)
        console.log('language:', newLang);
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getCodeCompile({language_id: language.id, source_code: btoa(code), stdin: btoa("")})
    }

    return (
        <form onSubmit={handleSubmit}>
            <select className={"select-lang"} onChange={handleSelectLanguage}>
                {languageOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <button type={"submit"}>Compile</button>
            <div className={"Editor"}>
                <Editor
                    width="100%"
                    height="70vh"
                    language={language.value}
                    theme="vs-dark"
                    value={code}
                    onChange={handleChange}
                />
            </div>

            <label className={"compiler"}>
                <textarea readOnly value={atob(props.compileRes.toString())}/>
            </label>
        </form>
    );
}