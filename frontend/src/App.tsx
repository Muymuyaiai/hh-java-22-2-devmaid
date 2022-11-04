import './App.css';
import useHooks from "./hooks/UseHooks";
import Landing from "./components/Landing";
import {useState} from "react";
import axios from "axios";

function App() {

    const {getCodeTranslation, getCodeCompile, getChatBotAnswer, compileRes, translationRes} = useHooks()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [me, setMe] = useState("")

    function handleLogin() {
        axios.get("api/user/login", {auth: {username, password}})
            .then(response => response.data)
            .then((data) => setMe(data))
            .then(() => setUsername(""))
            .then(() => setPassword(""))
            .catch(() => alert("Sorry, User oder Passwort war falsch!"))
    }

    return (
        <div>
            {!me &&
                <div className={"login-container"}>
                <div className={"login"}>
                    <input value={username} onChange={event => setUsername(event.target.value)}/>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                    <button onClick={handleLogin}>Login</button>
                </div>
                </div>
            }
            {me && <>
                <Landing
                    getCodeTranslation={getCodeTranslation}
                    getCodeCompile={getCodeCompile}
                    getChatBotAnswer={getChatBotAnswer}
                    compileRes={compileRes}
                    translationRes={translationRes}
                />
            </>
            }
        </div>
    );
}

export default App;
