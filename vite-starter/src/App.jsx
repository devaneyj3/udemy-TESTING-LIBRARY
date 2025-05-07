import './App.css';
import { useState } from 'react';
function App() {
  const [color, setColor] = useState("red");
  const nextColor = color === "blue" ? "red" : "blue";
  return (
    <div>
      <button className={color} onClick={() => setColor(nextColor)} >
        {nextColor}
      </button>
      <input 
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
