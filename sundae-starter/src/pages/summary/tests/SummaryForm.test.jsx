import { render, screen } from '../../../test-utils/testing-library-utils';
import SummaryForm from '../SummaryForm';
import  userEvent  from '@testing-library/user-event'


test('Checkbox workflow', async () => {
  render(<SummaryForm />)

  const user = userEvent.setup()
  
  const button = screen.getByRole('button',  {name: /confirm/i} )
  const checkbox = screen.getByRole('checkbox', { name: /agree/i })
  
  //check initial state
  expect(button).toBeDisabled()
  expect(checkbox).not.toBeChecked()
  
  await user.click(checkbox)
  
  //if checkbox is check but is enable
  expect(checkbox).toBeChecked()
  expect(button).toBeEnabled()

  await user.click(checkbox)
  expect(button).toBeDisabled()
  expect(checkbox).not.toBeChecked()


})

test('Popover response to hover', async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)
  
  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()
  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()
  // popover disappears when we mouse out
  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})