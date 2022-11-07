import './Landing.css';
import Translation from "./Translation";
import ChatBot from "./ChatBot";
import TranslationReq from "../model/TranslationReq";
import CompileReq from "../model/CompileReq";
import CodeEditor from "./CodeEditor";
import {Navbar} from "./Navbar";
import ChatBotReq from "../model/ChatBotReq";
import UserProfile from "./UserProfile";
import {useState} from "react";

type LandingProps = {
    me: string
    handleLogout: () => void
    getCodeTranslation: (request: TranslationReq) => void
    getCodeCompile: (request: CompileReq) => void
    getChatBotAnswer: (request: ChatBotReq) => void
    compileRes: string
    translationRes: string
    chatBotRes: string
}

export default function Landing(props: LandingProps) {
    const [profile, setProfile] = useState(false)

    return (

        <div className="container">
            <div className="navbar">
                <Navbar handleLogout={props.handleLogout} setProfile={setProfile} me={props.me}/>
            </div>
            <div className="mainframe">
                <div className="editor">
                    {<CodeEditor
                        getCodeCompile={props.getCodeCompile}
                        compileRes={props.compileRes}
                    />}
                </div>
                <div className="sidebar">
                    <div className="translator">
                        <Translation
                            getCodeTranslation={props.getCodeTranslation}
                            translationRes={props.translationRes}
                        />
                    </div>
                    <div className="chatbot">
                        <ChatBot
                            getChatBotAnswer={props.getChatBotAnswer}
                            chatBotRes={props.chatBotRes}
                        />
                    </div>
                </div>
            </div>
            {profile &&
                <UserProfile setProfile={setProfile}/>
            }
        </div>
    );
}