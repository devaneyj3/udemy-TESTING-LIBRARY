import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../summary/SummaryForm';

test('Checkbox workflow', () => {
  render(<SummaryForm />)
  
  const button = screen.getByRole('button',  {name: /confirm/i} )
  const checkbox = screen.getByRole('checkbox', { name: /agree/i })
  
  //check initial state
  expect(button).toBeDisabled()
  expect(checkbox).not.toBeChecked()
  
  fireEvent.click(checkbox)
  
  //if checkbox is check but is enable
  expect(checkbox).toBeChecked()
  expect(button).toBeEnabled()

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  expect(checkbox).not.toBeChecked()


})