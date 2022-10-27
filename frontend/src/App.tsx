import logo from './logo.svg';
import './App.css';
import Translation from "./components/Translation";
import useGpt3 from "./hooks/UseGpt3";
import CodeEditor from './components/CodeEditor';


function App() {

  const {getCodeTranslation, translationRes} = useGpt3()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Translation getCodeTranslation={getCodeTranslation} translationRes={translationRes}/>
          <CodeEditor/>
      </header>
    </div>
  );
}

export default App;
