import "./App.css";
import { useState } from "react";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const newButtonColor = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const className = disabled ? "gray" : buttonColor;

  console.log("buttonColor", buttonColor);
  console.log("newButtonColor", newButtonColor);
  console.log("className", className);
  console.log("disabled", disabled);
  return (
    <div>
      <button
        className={className}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {kebabCaseToTitleCase(newButtonColor)}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;