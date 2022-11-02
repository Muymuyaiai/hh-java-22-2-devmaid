import './App.css';
import useHooks from "./hooks/UseHooks";
import Landing from "./components/Landing";
import {useState} from "react";
import axios from "axios";

function App() {

    const {getCodeTranslation, getCodeCompile, compileRes, translationRes} = useHooks()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [me, setMe] = useState("")

    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")

    function handleLogin(){
        // log in (get session) with username and password
        axios.get("api/user/login", {auth: {username, password}})
            .then(response => response.data)
            .then((data) => setMe(data))
            .then(() => setUsername(""))
            .then(() => setPassword(""))
            .catch(() => alert("Sorry, User oder Passwort war falsch!"))
    }

    function handleLogout(){
        axios.get("api/user/logout")
            .then(() => setMe(""))
    }

    function handleRegister(){
        axios.post("api/user/register", {
            username: newUsername,
            password: newPassword
        })
            .then(() => setNewUsername(""))
            .then(() => setNewPassword(""))
    }



    return (
        <div>
            {!me &&
                <>
                    <h3>Login</h3>
                    <input value={username} onChange={event => setUsername(event.target.value)}/>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                    <button onClick={handleLogin}>Login</button>

                    <h3>Sign Up</h3>
                    <input value={newUsername} onChange={event => setNewUsername(event.target.value)} />
                    <input type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                    <button onClick={handleRegister}>Sign Up</button>
                </>
            }
            {me && <>
                <Landing
                    getCodeTranslation={getCodeTranslation}
                    getCodeCompile={getCodeCompile}
                    compileRes={compileRes}
                    translationRes={translationRes}
                />
            </>
                }
            </div>
    );
}

export default App;
