import './CodeEditor.css';
import React, {FormEvent, useState} from "react";
import MonacoEditor, {EditorDidMount} from "react-monaco-editor";
import * as monaco from 'monaco-editor';
import {MonacoServices} from "monaco-languageclient";
import {languageOptions} from "./LanguageOptions";
import CompileReq from "../model/CompileReq";

import('monaco-themes/themes/Monokai.json')
    .then((data: any) => {
        monaco.editor.defineTheme('monokai', data);
        monaco.editor.setTheme('monokai')
    })



const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
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




type NewEditorProps = {
    compileRes: string
    getCodeCompile: (request: CompileReq) => void
}

export function NewEditor(props: NewEditorProps) {
    const [code, setCode] = useState("text")
    const [language, setLanguage] = useState(languageOptions[0])

    const editorDidMount: EditorDidMount = (editor) => {
        MonacoServices.install(monaco as any);
        if (editor && editor.getModel()) {
            const editorModel = editor.getModel();
            editorModel && editorModel.setValue('{\nlet message: string = \'Hello, World!\';\n' +
                'console.log(message);\n}');
        }
        editor.focus();
    };

    const handleChange = (newCode: string) => {
        console.log('onChange', newCode);
        setCode(newCode)
    };

    const handleSelectLanguage = (selectedOption: any) => {
        console.log("selected Option...", selectedOption);
        setLanguage(selectedOption);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.getCodeCompile({language_id: language.id, source_code: btoa(code), stdin: btoa("")})
    }

    return (
        <form onSubmit={handleSubmit}>
            <select className={"select-lang"} onChange={handleSelectLanguage}>
                {languageOptions.map((options) => (
                    <option key={options.label} value={options.value}>
                        {options.label}
                    </option>
                ))}
            </select>
            <button className={"run"} type={"submit"}>Compile</button>
            <div>
                <MonacoEditor
                    width="100%"
                    height="70vh"
                    language={language.value}
                    theme="monokai"
                    options={MONACO_OPTIONS}
                    onChange={handleChange}
                    editorDidMount={editorDidMount}
                />
            </div>

            <label className={"output"}>
                <textarea readOnly value={atob(props.compileRes.toString())}/>
            </label>
        </form>
    );
}