import './Landing.css';
import Translation from "./Translation";
import ChatBot from "./ChatBot";
import TranslationReq from "../model/TranslationReq";
import CompileReq from "../model/CompileReq";
import CodeEditor from "./CodeEditor";
import {Navbar} from "./Navbar";
import {NewEditor} from "./NewEditor";

type LandingProps = {
    getCodeTranslation: (request: TranslationReq) => void
    getCodeCompile: (request: CompileReq) => void
    getChatBotAnswer: (request: string) => string
    compileRes: string
    translationRes: string
}


export default function Landing(props: LandingProps) {

    return (

        <div className="container">
            <div className={"navbar"}>
                <Navbar/>
            </div>
            <div className={"main"}>
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
                <ChatBot getChatBotAnswer={props.getChatBotAnswer}/>
            </div>
            </div>
        </div>
    );
}