
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

test("Button click flow", () => {
  render(<App />);

  //find the button
  const button = screen.getByRole("button", { name: /blue/i });
  expect(button).toHaveClass("red");

  fireEvent.click(button);  


  expect(button).toHaveTextContent(/red/i);
  expect(button).toHaveClass("blue");
});

test('Checkbox flow', () => {
  render(<App />);

  //find elements
  const button = screen.getByRole('button', { name: /blue/i });
  const checkbox = screen.getByRole('checkbox', { name: /disable button/i });

  //check initial conditions
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  //click checkbox to disable button
  fireEvent.click(checkbox);  
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();
  
  //click checkbox to enable button
  fireEvent.click(checkbox);  
    expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();

}
  );

