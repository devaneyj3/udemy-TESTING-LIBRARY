import axios from 'axios';
import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({setOrderPhase}) {
  const [confimationNum, setConfirmationNum] = useState(null)
  const [error, setError] = useState(null)

  const { resetOrder} = useOrderDetails()

  const newOrder = () => {
    resetOrder()
    setOrderPhase('inProgress')
  }
  
  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setConfirmationNum(response.data.orderNumber))
      .catch((error) => setError(true));
  }, [])
  if (confimationNum) {
    return (
  
      <div>
        <h1>Your Order Number is {confimationNum}</h1>
        <Button onClick={newOrder}>Create new order</Button>
      </div>
    
    )
  } else {
    return <div>Loading...</div>
  }

}
