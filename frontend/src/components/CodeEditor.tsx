import './CodeEditor.css';
import React, {FormEvent, useState} from "react";
import MonacoEditor from "react-monaco-editor";
import { monaco } from 'react-monaco-editor';
import {languageOptions} from "./LanguageOptions";
import CompileReq from "../model/CompileReq";
import LanguageOption from '../model/LanguageOption';

import('monaco-themes/themes/Monokai.json')
    .then((data:any) => {
        monaco.editor.defineTheme('monokai', data);
        monaco.editor.setTheme('monokai')
    })

type CodeEditorProps = {
    compileRes: String
    getCodeCompile: (request: CompileReq) => void
}

const MONACO_OPTIONS: monaco.editor.IDiffEditorConstructionOptions = {
    autoIndent: "full",
    automaticLayout: true,
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
        enabled: false,
    },
    readOnly: false,
    scrollbar: {
        horizontalSliderSize: 4,
        verticalSliderSize: 18,
    },
};

export default function CodeEditor(props: CodeEditorProps) {
    const [code, setCode] = useState('{\nlet message: string = \'Hello, World!\';\nconsole.log(message);\n}')
    const [language, setLanguage] = useState<LanguageOption>(languageOptions[0])

    const handleChange = (newCode: string) => {
        setCode(newCode)
    }

    const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const  newLang = languageOptions.find((value:LanguageOption) => value.id === Number(event.target.value))
        if(newLang!) {
        setLanguage(newLang)
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getCodeCompile({language_id: language.id, source_code: btoa(code), stdin: btoa("")})
    }

    return (
        <form onSubmit={handleSubmit}>
            <select className={"select-lang"} onChange={handleSelectLanguage}>
                {languageOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <button type={"submit"}>Compile</button>
            <div className={"Editor"}>
                <MonacoEditor
                    width="100%"
                    height="70vh"
                    language={language.name}
                    theme="monokai"
                    value={code}
                    options={MONACO_OPTIONS}
                    onChange={handleChange}
                />
            </div>

            <label className={"compiler"}>
                <textarea readOnly value={atob(props.compileRes.toString())}/>
            </label>
        </form>
    );
}