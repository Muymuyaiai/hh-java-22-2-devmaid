import './Login.css';
import {useState} from "react";

type LoginProps = {
    handleLogin: (username: string, password: string) => void
}

export default function Login(props: LoginProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        props.handleLogin(username, password)

        setUsername("")
        setPassword("")
    }

    return (

        <div className={"login-container"}>
            <div className={"login"}>
                <input onKeyDown={(e) => {e.key === 'Enter' && handleLogin()}} value={username} onChange={event => setUsername(event.target.value)}/>
                <input onKeyDown={(e) => {e.key === 'Enter' && handleLogin()}} type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}