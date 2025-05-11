import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'
import { test } from 'vitest'

test('order phases for happy path', async() => {
  // render app
  render(<App />)
  
  const user = userEvent.setup()

  // add ice cream scoop and toppings - total: $5.50
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2')

  const cherriesInput = await screen.findByRole('checkbox', { name: "Cherries" })
  await user.click(cherriesInput)

  // click order sundae button to go to review page
  const orderSundaeButton = screen.getByRole('button', { name: /order/i })
  await user.click(orderSundaeButton)
  
  
  // check summary information based on order
  const scoopsSummary = screen.getByRole('heading', {name: /scoops: /i})
  const toppingsSummary = screen.getByRole('heading', { name: /toppings: /i })
  
  expect(scoopsSummary).toHaveTextContent('4.00')
  expect(toppingsSummary).toHaveTextContent('1.50')


  // accept terms and conditions and click button to confirm order
  const confirmButton = screen.getByRole('button', { name: /confirm/i })
  const termsCheckBox = screen.getByRole('checkbox', { name: /terms/i })

  await user.click(termsCheckBox)
  await user.click(confirmButton)
  
  // confirm order number on confirmation page
  
  const confimationNum = await screen.findByText(/order number/i)
  expect(confimationNum).toBeInTheDocument()
  // click 'new order' button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  expect(newOrderButton).toBeInTheDocument()

  await user.click(newOrderButton)


  // check that scoops and topping subtotals have been reset
    const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  
    const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

})

test('If no toppings ordered do not show toppings header in summary page', async() => {
  render(<App />)
  
  const user = userEvent.setup()

  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '2')

  const orderButton = await screen.findByRole('button', { name: /order sundae/i })
  
  await user.click(orderButton)

  const toppingsHeadeing = screen.queryByText('heading', { name: /toppings:/i })
  
  expect(toppingsHeadeing).not.toBeInTheDocument()

})