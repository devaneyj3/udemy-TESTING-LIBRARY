import React from 'react'
import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails()
  
  const scoopsArray = Object.entries(optionCounts.scoops)
  const scoopList = scoopsArray.map(([key, value]) => (
    <li key={value}>
      {value} {key}
    </li>
  ))

  const toppingArray = Object.keys(optionCounts.toppings)
  const toppingsList = toppingArray.map((key) => (
    <li key={key}>
      {key}
    </li>
  ))
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {scoopList}
      </ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>
        {toppingsList}
      </ul>
      <SummaryForm />
    </div>
  )
}
