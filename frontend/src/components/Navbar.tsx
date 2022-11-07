import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {Dispatch, SetStateAction} from "react";


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
                <FontAwesomeIcon className="dd-button" icon={faUser} size="2x"/>
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