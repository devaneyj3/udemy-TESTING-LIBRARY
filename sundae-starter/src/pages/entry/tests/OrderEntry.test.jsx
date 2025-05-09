import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry';
import {server} from "../../../mocks/server";
import { http, HttpResponse } from "msw";

test('handles error for scoops and topping routes', async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />)
  
  const alerts = await screen.findAllByText( "An unexpected error occurred. Please try again later.")
  expect(alerts).toHaveLength(2)
})