import './UserSettings.css';
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import User from "../model/User";
import UserCard from "./UserCard";
import {UserInfo} from "../model/UserInfo";
import UserDTO from "../model/UserDTO";


type UserProfileProps = {
    setSettings: Dispatch<SetStateAction<boolean>>
    users: User[]
    getAllUsers: () => void
    createUser: (username: string, password: string) => void
    updateUser: (updatedUser: UserDTO) => void
    deleteUser: (username: String) => void
    me: UserInfo
}

export default function UserSettings(props: UserProfileProps) {
    const [visible, setVisible] = useState("profile")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")

    useEffect(() => {
        props.getAllUsers()
    }, [props.deleteUser, props.deleteUser])

    const closeProfile = () => {
        props.setSettings(false)
    }

    const showContent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setVisible(event.currentTarget.id)
        event.currentTarget.id === "users" && props.getAllUsers()
    }

    const handleCreateUser = () => {
        username && password ?
            props.createUser(username, password)
            : alert("Username and Password can't be empty")
        setUsername("")
        setPassword("")
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
        return users.filter((user) => user.roles[0] === "USER")
            .map((user) => <div key={user.username}><UserCard user={user} deleteUser={props.deleteUser}/></div>)
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
                        {props.me.roles[0] === "ADMIN" &&
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
                                   onChange={event => setPasswordCheck(event.target.value)} placeholder="Re-enter password"/>
                            <button onKeyDown={handleChangePassword}>Submit</button>
                        </div>

                    }
                    {visible === "users" &&
                        <div>
                            <div>
                            <input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username"/>
                            <input type="password" value={password}
                                   onChange={event => setPassword(event.target.value)} placeholder="Password"/>
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
                        <textarea></textarea>
                    }
                    {visible === "translator" &&
                        <textarea></textarea>
                    }
                </div>
            </div>
        </div>
    )
}