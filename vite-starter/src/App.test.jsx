
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Button click flow", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /blue/i });
  expect(button).toHaveClass("red");

  fireEvent.click(button);  


  expect(button).toHaveTextContent(/red/i);
  expect(button).toHaveClass("blue");
});

