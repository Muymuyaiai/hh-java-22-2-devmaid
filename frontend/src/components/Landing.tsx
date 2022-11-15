import './Landing.css';
import Translation from "./Translation";
import ChatBot from "./ChatBot";
import TranslationReq from "../model/TranslationReq";
import CompileReq from "../model/CompileReq";
import CodeEditor from "./CodeEditor";
import {Navbar} from "./Navbar";
import ChatBotReq from "../model/ChatBotReq";
import UserSettings from "./UserSettings";
import React, {useState} from "react";
import User from "../model/User";
import {UserInfo} from "../model/UserInfo";
import UserDTO from '../model/UserDTO';

type LandingProps = {
    me: UserInfo
    users: User[]
    getAllUsers: () => void
    createUser: (username: string, password: string) => void
    updateUser: (updatedUser: UserDTO) => void
    deleteUser: (username: String) => void
    handleLogout: () => void
    getCodeTranslation: (request: TranslationReq) => void
    getCodeCompile: (request: CompileReq) => void
    getChatBotAnswer: (request: ChatBotReq) => void
    compileRes: string
    translationRes: string
    chatBotRes: string
}

export default function Landing(props: LandingProps) {
    const [settings, setSettings] = useState(false)


    return (

        <div className="container">
            <div className="navbar">
                <Navbar handleLogout={props.handleLogout} setProfile={setSettings} me={props.me}/>
            </div>
            <div className="mainframe">
                <div className="editor ">
                    <CodeEditor
                        me={props.me}
                        getCodeCompile={props.getCodeCompile}
                        compileRes={props.compileRes}
                        updateUser={props.updateUser}
                    />
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
            {settings &&
                <UserSettings
                    setSettings={setSettings}
                    users={props.users}
                    getAllUsers={props.getAllUsers}
                    createUser={props.createUser}
                    updateUser={props.updateUser}
                    deleteUser={props.deleteUser}
                    me={props.me}/>
            }
        </div>
    );
}