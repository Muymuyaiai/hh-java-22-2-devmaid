import './Navbar.css';
import {Dispatch, SetStateAction} from "react";
import { FaTerminal } from 'react-icons/fa';
import {UserInfo} from "../model/UserInfo";


type NavbarProps = {
    me: UserInfo
    handleLogout: () => void
    setProfile: Dispatch<SetStateAction<boolean>>
}

export function Navbar (props: NavbarProps) {

    const showSettings = () => {
        props.setProfile(true)
    }

    return (
        <label className="navbar-container">
            <div className="logo">
                <h3>dev_MAID</h3>
            </div>
            <div className="dropdown">
                <div className="profile-icon">
                <FaTerminal className="dd-button"/>
                </div>
                <input type="checkbox" className="dd-input"/>
                <ul className="dd-menu">
                    <div className="signed-in">
                        <div>Signed in as</div>
                        <div className="user">{props.me.username}</div>
                    </div>
                    <li onClick={showSettings}>Settings</li>
                    <li onClick={props.handleLogout}>Sign Out</li>
                </ul>
            </div>
        </label>
    )
}