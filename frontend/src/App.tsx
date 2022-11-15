import './App.css';
import UseHooks from "./hooks/UseHooks";
import Landing from "./components/Landing";
import UseUser from "./hooks/UseUser";
import Login from "./components/Login";


function App() {

    const {getCodeTranslation, getCodeCompile, getChatBotAnswer, compileRes, translationRes, chatBotRes} = UseHooks()
    const {handleLogin, handleLogout, getAllUsers, createUser, updateUser, deleteUser, me, users} = UseUser()

    return (
        <div>
            {!me &&
                <Login handleLogin={handleLogin}/>
            }
            {me && <>
                <Landing
                    me={me}
                    users={users}
                    getAllUsers={getAllUsers}
                    createUser={createUser}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
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
