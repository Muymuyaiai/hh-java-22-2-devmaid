
import './App.css';
import Translation from "./components/Translation";
import useHooks from "./hooks/UseHooks";
import CodeEditor from './components/CodeEditor';


function App() {

    const {getCodeTranslation, getCodeCompile, compileRes, translationRes} = useHooks()

    return (
        <div className="App">
            <div className="App-header">
                <Translation getCodeTranslation={getCodeTranslation} translationRes={translationRes}/>
                <CodeEditor getCodeCompile={getCodeCompile} compileRes={compileRes}/>
            </div>
        </div>
    );
}

export default App;
