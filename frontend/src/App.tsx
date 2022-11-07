import './App.css';
import UseHooks from "./hooks/UseHooks";
import Landing from "./components/Landing";
import UseLogin from "./hooks/UseLogin";
import Login from "./components/Login";

function App() {

    const {getCodeTranslation, getCodeCompile, getChatBotAnswer, compileRes, translationRes, chatBotRes} = UseHooks()
    const {handleLogin, handleLogout, me} = UseLogin()

    return (
        <div>
            {!me &&
                <Login handleLogin={handleLogin}/>
            }
            {me && <>
                <Landing
                    me={me}
                    handleLogout={handleLogout}
                    getCodeTranslation={getCodeTranslation}
                    translationRes={translationRes}
                    getCodeCompile={getCodeCompile}
                    compileRes={compileRes}
                    getChatBotAnswer={getChatBotAnswer}
                    chatBotRes={chatBotRes}

                />
            </>
            }
        </div>
    );
}

export default App;
