import './UserSettings.css';
import React, {Dispatch, SetStateAction, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import User from "../model/User";
import UserCard from "./UserCard";
import {UserInfo} from "../model/UserInfo";
import UserDTO from "../model/UserDTO";
import TranslationCard from './TranslationCard';
import SourceCodeCard from "./SourceCodeCard";
import Translation from "../model/Translation";
import SourceCode from "../model/SourceCode";


type UserProfileProps = {
    setSettings: Dispatch<SetStateAction<boolean>>
    users: User[]
    user: User
    getUser: (username: string) => void
    getAllUsers: () => void
    createUser: (username: string, password: string) => void
    updateUser: (updatedUser: User) => void
    deleteUser: (username: String) => void
    me: UserInfo
}

export default function UserSettings(props: UserProfileProps) {
    const [visible, setVisible] = useState("profile")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")

    const closeProfile = () => {
        props.setSettings(false)
    }

    const showContent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setVisible(event.currentTarget.id)
        event.currentTarget.id === "users" && props.getAllUsers()
        event.currentTarget.id === ("editor" || "translator") && props.getUser(props.me.username)
    }

    const handleCreateUser = () => {
        username && password ?
            props.createUser(username, password)
            : alert("Username and Password can't be empty")
        setUsername("")
        setPassword("")
    }

    const handleDeleteUser = (username: string) => {
        props.deleteUser(username)
    }

    const handleChangePassword = () => {
        if (password === passwordCheck) {
            const newUser: UserDTO = {username: props.me.username, password: password}
            props.updateUser(newUser)
        } else {
            alert("The passwords have to match!")
        }
        setPassword("")
        setPasswordCheck("")
    }

    const mapUsers = (users: User[]) => {
        return users.filter((user) => user.roles?.includes("USER") )
            .map((user) =>
                <div key={user.username}><UserCard user={user} deleteUser={handleDeleteUser}/>
                </div>)
    }

    const mapTranslations = () => {
        return props.user.translations?.map((transl) =>
            <div key={transl.name}><TranslationCard translation={transl} deleteTranslation={deleteTranslation}/>
            </div>)
    }

    const mapCodes = () => {
        return props.user.sourceCodes?.map((code) =>
            <div key={code.name}><SourceCodeCard code={code} deleteSourceCode={deleteSourceCode}/>
            </div>)
    }

    const deleteTranslation = (translation: Translation) => {
        props.getUser(props.me.username)
        let updatedUser: User = {
            username: props.user.username,
            translations: props.user.translations?.filter((transl) => transl !== translation)
        }
        props.updateUser(updatedUser)
    }

    const deleteSourceCode = (sourceCode: SourceCode) => {
        props.getUser(props.me.username)
        let updatedUser: User = {
            username: props.user.username,
            sourceCodes: props.user.sourceCodes?.filter((code) => code !== sourceCode)
        }
        props.updateUser(updatedUser)
    }

    return (
        <div className="user-settings-container">
            <div className="top">
                <p className="title">Settings</p>
                <div className="close">
                    <FontAwesomeIcon onClick={closeProfile} icon={faXmark} size={"1x"}/>
                </div>
            </div>
            <div className="settings-container">
                <div className="settings-bar">
                    <ul>
                        <li onClick={showContent} id={"profile"}>Profile</li>
                        {props.me.roles.includes("ADMIN") &&
                            <li onClick={showContent} id={"users"}>Users</li>
                        }
                        <li onClick={showContent} id={"editor"}>Editor</li>
                        <li onClick={showContent} id={"translator"}>Translator</li>
                    </ul>
                </div>
                <div className="settings-content">
                    {visible === "profile" &&
                        <div>
                            <h2>
                                {props.me.username}
                            </h2>
                            <p>Change password</p>
                            <input type="password" value={password}
                                   onChange={event => setPassword(event.target.value)} placeholder="New password"/>
                            <input type="password" value={passwordCheck}
                                   onChange={event => setPasswordCheck(event.target.value)}
                                   placeholder="Re-enter password"/>
                            <button onKeyDown={handleChangePassword}>Submit</button>
                        </div>
                    }
                    {visible === "users" &&
                        <div>
                            <div>
                                <input value={username} onChange={event =>
                                    setUsername(event.target.value)} placeholder="Username"
                                />
                                <input type="password" value={password} onChange={event =>
                                    setPassword(event.target.value)} placeholder="Password"
                                />
                                <button onClick={handleCreateUser}>Add User</button>
                            </div>
                            <div className="users-top">
                                <div className="users-name">Username</div>
                                <div className="users-role">Role</div>
                            </div>
                            {mapUsers(props.users)}
                        </div>
                    }
                    {visible === "editor" &&
                        <div>
                            <h2>Editor Codes</h2>
                            <div className="code-top">
                                <div className="code-name">Name</div>
                                <div className="code-lang">Language</div>
                            </div>
                            {mapCodes()}
                        </div>
                    }
                    {visible === "translator" &&
                        <div>
                            <h2>Translations</h2>
                            <div className="transl-top">
                                <div className="transl-name">Name</div>
                                <div className="transl-from-to">from</div>
                                <div className="transl-from-to">to</div>
                            </div>
                            {mapTranslations()}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}