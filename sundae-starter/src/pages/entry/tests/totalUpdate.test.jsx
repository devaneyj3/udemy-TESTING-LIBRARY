import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect } from "vitest";
import OrderEntry from "../OrderEntry";
import { findByRole, getByRole } from "@testing-library/react";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test('update topping subtotal when toppings are updated', async() => {
  const user = userEvent.setup()
  render(<Options optionType="toppings" />)

  //make sure topping total starts out at 0.00
  const toppingSubtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingSubtotal).toHaveTextContent('0.00')

  //select a topping and make sure the total is updated
  
  const cherriesCheckboxInput = await screen.findByRole('checkbox', { name: 'Cherries' })
  await user.click(cherriesCheckboxInput)
  expect(toppingSubtotal).toHaveTextContent("1.50")

  //select another topping and make sure the total is updated
  const mmCheckboxInput = await screen.findByRole('checkbox', { name: 'M&Ms' })
  await user.click(mmCheckboxInput)
  expect(toppingSubtotal).toHaveTextContent('3.00')
  
  //uncheck cherries checkbox and make sure total is updated
  await user.click(cherriesCheckboxInput)
  expect(toppingSubtotal).toHaveTextContent('1.50')
})  

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />)
    
    const grandTotalHeader =  screen.getByRole('heading', {name: /grand total: \$/i })
    expect(grandTotalHeader).toBeInTheDocument()
    
  })
  test('grand total updates properly if scoop is added first', async() => {
    const user = userEvent.setup();
    
    render(<OrderEntry />)

    // update vanilla scoops to 2 and check grand total
    render(<Options optionType="scoops" />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    
    const grandTotalHeader = await screen.findByRole('heading', { name: /grand total: \$/i })
    expect(grandTotalHeader).toHaveTextContent(/\$4\.00/i)
    
    // add cherries and check grand total
    const cherriesCheckboxInput = await screen.findByRole('checkbox', { name: 'Cherries' })
    await user.click(cherriesCheckboxInput)
    
    expect(grandTotalHeader).toHaveTextContent('5.50')

    
    
  })
  test('grand total updates properly if topping is added first', async() => {
    const user = userEvent.setup();
    
    render(<OrderEntry />)
    
    
    // add cherry topping and update grand total
    const cherriesCheckboxInput = await screen.findByRole('checkbox', { name: 'Cherries' })
    await user.click(cherriesCheckboxInput)
    
    const grandTotalHeader = await screen.findByRole('heading', { name: /grand total: \$/i })
    expect(grandTotalHeader).toHaveTextContent('1.50')
    
    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla",});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    
    expect(grandTotalHeader).toHaveTextContent('5.50')
  })
  test('grand total updates properly if item is added removed', async() => {
    const user = userEvent.setup()
    render(<OrderEntry />)
    
    //add cherries, grand total should be 1.50
    const cherriesCheckboxInput = await screen.findByRole('checkbox', { name: 'Cherries' })
    await user.click(cherriesCheckboxInput)

    //update vanilla scoops to 2, grand total should be 5.50
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla",});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    //remove one scoop of vanilla and check grand total
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    
    //check grand total
    const grandTotalHeader = await screen.findByRole('heading', { name: /grand total: \$/i })
    expect(grandTotalHeader).toHaveTextContent('3.50')

    //remove cherries and check grand total
    await user.click(cherriesCheckboxInput)
    expect(grandTotalHeader).toHaveTextContent('2.00')
    
  })
})