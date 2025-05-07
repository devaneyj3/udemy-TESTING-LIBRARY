import { logRoles } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Button starts with correct color", () => {
  const { container } = render(<App />);
  logRoles(container);
  const button = screen.getByRole("button", { name: /blue/i });
  expect(button).toHaveClass("red");
});

test("Button starts with correct text", () => {

});

test("Button has correct color after click", () => {

});
test("Button has correct text after click", () => {

});
