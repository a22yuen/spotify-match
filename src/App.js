import logo from './logo.svg';
import './App.css';
const colors = require("tailwindcss/colors");


function App() {
  console.log("==tailwind colors", colors)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <div className="flex-row justify-center bg-black rounded py-2 px-2">
        <p className="text-lg font-bold text-spotify-green">Tailwind Testing</p>
        </div>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
