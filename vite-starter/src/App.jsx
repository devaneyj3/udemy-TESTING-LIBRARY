import './App.css';
import { useState } from 'react';
function App() {
  const [color, setColor] = useState("red");
  const [disabled, setDisabled] = useState(false);

  const nextColor = color === "blue" ? "red" : "blue";
  return (
    <div>
      <button className={color} onClick={() => setColor(nextColor)} disabled={disabled}>
        {nextColor}
      </button>
      <input 
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={(e) => setDisabled(e.target.checked)}
        />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
