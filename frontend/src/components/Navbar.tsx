import './Navbar.css';
import logo from '../images/maid-logo.png';

export function Navbar () {
    return (
        <div className={"navbar-container"}>
            <img className={"logo"} src={logo} alt={"Logo"}/>
            <p>dev_MAID v0.1</p>
        </div>
    )
}