import './Landing.css';
import Translation from "./Translation";
import TranslationReq from "../model/TranslationReq";
import CompileReq from "../model/CompileReq";
import CodeEditor from "./CodeEditor";

type LandingProps = {
    getCodeTranslation: (request: TranslationReq) => void
    getCodeCompile: (request: CompileReq) => void
    compileRes: string
    translationRes: string
}


export default function Landing(props: LandingProps) {

    return (
        <div className="container">
            <div className="editor">
                {<CodeEditor
                    getCodeCompile={props.getCodeCompile}
                    compileRes={props.compileRes}
                />}
            </div>
            <div className="translator">
                <Translation
                    getCodeTranslation={props.getCodeTranslation}
                    translationRes={props.translationRes}
                />
            </div>
        </div>
    );
}