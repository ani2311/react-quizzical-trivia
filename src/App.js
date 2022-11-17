import logo from './logo.svg';
import './App.css';
import Start from './Start';
import Quizzical from './Quizzical';
import {useState} from 'react';

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      {!start && <Start startHandler={() => setStart(true)}/>}
      {start && <Quizzical restartHandler={() => setStart(false)}/>}
    </div>
  );
}

export default App;
