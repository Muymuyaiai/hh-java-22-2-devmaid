import './CodeEditor.css';
import React, {FormEvent, useState} from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from 'monaco-editor';
import {languageOptions} from "./LanguageOptions";
import Select from "react-select";
import CompileReq from "../model/CompileReq";

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
    const [code, setCode] = useState("text")
    const [language, setLanguage] = useState(languageOptions[0])


    const handleChange = (newCode: string) => {
        setCode(newCode)
        console.log(code)
    }

    const handleSelectChange = (selectedOption: any) => {
        console.log("selected Option...", selectedOption);
        setLanguage(selectedOption);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getCodeCompile({language_id: language.id, source_code: btoa(code), stdin: btoa("")})
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select className={"select-lang"} options={languageOptions} onChange={handleSelectChange}/>
            <div className={"Editor"}>
                <MonacoEditor
                    width="800"
                    height="600"
                    language={language.value}
                    theme="vs-dark"
                    value={code}
                    options={MONACO_OPTIONS}
                    onChange={handleChange}
                />
            </div>
            <button type={"submit"}>Compile</button>
            <label className={"compiler"}>
           <textarea readOnly value={atob(props.compileRes.toString())}/>
            </label>
        </form>
    );
}