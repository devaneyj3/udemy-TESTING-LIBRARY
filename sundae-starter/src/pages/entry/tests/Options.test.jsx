import { render, screen } from '../../../test-utils/testing-library-utils'

import Options from '../Options';
import ScoopOption from "../ScoopOption";
import { expect } from 'vitest';

test('displays image for each scoop option from the server', async() => {
  render(<Options optionType="scoops" />)
  
  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  const altText = scoopImages.map((el) => el.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image and alt text for each topping from the server', async () => {
  render(<Options optionType='toppings' />)
    
    //find images
  const toppings = await screen.findAllByRole('img', { name: /topping$/ })
  expect(toppings).toHaveLength(3)

  //find by alt text

  const imageTitles = toppings.map((el) => el.alt)
  expect(imageTitles).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping'])

})