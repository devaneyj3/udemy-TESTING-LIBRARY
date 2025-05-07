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
    </div>
  );
}

export default App;
