import './App.css';
import UseFeatures from "./hooks/UseFeatures";
import Landing from "./components/Landing";
import UseUser from "./hooks/UseUser";
import Login from "./components/Login";


function App() {

    const {getCodeTranslation, getCodeCompile, getChatBotAnswer,setTranslationRes, compileRes, translationRes, chatBotRes} = UseFeatures()
    const {handleLogin, handleLogout, getAllUsers, createUser, updateUser, getUser, deleteUser, me, user, users} = UseUser()

    return (
        <div>
            {!me &&
                <Login handleLogin={handleLogin}/>
            }
            {me && <>
                <Landing
                    me={me}
                    user={user}
                    users={users}
                    getUser={getUser}
                    getAllUsers={getAllUsers}
                    createUser={createUser}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                    handleLogout={handleLogout}
                    getCodeTranslation={getCodeTranslation}
                    setTranslationRes={setTranslationRes}
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
