
import './App.css';
import Start from './Start';
import Quizzical from './Quizzical';
import {useState} from 'react';

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      {!start && <Start startHandler={() => setStart(true)}/>}
      {start && <Quizzical/>}
    </div>
  );
}

export default App;
