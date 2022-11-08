import './Navbar.css';
import {Dispatch, SetStateAction} from "react";
import { FaTerminal } from 'react-icons/fa';


type NavbarProps = {
    me: string
    handleLogout: () => void
    setProfile: Dispatch<SetStateAction<boolean>>
}

export function Navbar (props: NavbarProps) {

    const showProfile = () => {
        props.setProfile(true)
    }

    return (
        <label className="navbar-container">
            <div className="logo">
                <h3>dev_MAID</h3>
            </div>
            <div className="dropdown">
                <FaTerminal className="dd-button"/>
                <input type="checkbox" className="dd-input" id="test"/>
                <ul className="dd-menu">
                    <div className="signed-in">
                        <div>Signed in as</div>
                        <div className="user">{props.me}</div>
                    </div>
                    <li onClick={showProfile}>Settings</li>
                    <li onClick={props.handleLogout}>Sign Out</li>
                </ul>
            </div>
        </label>
    )
}