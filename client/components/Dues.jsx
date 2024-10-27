import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import PaymentComplete from './PaymentComplete';

const Dues = () => {
  
  const [duesStatus, setDuesStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const getDuesStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/dues`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log('Fetched data:', data);
      setDuesStatus(data);
    } catch (error) {
      console.log('error fetching users:', error);
    }
  }

  const handlePaymentStatus = () => {
    setPaymentStatus(true);
  }

  useEffect(() => {
    getDuesStatus();
  }, []);

  const stripePromise = loadStripe('pk_test_51QDFF8ANkqZlajimnVkDMJarXgUWm0caTKBB9CEtRfcZrBo32Z7mbrEvcbrSpWGCBKYPgt4Dah7YOEjEHawhhsJO00asjxLGZo');

  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
 
  return (
    <div>
      
      {duesStatus ? (<div><h1>Dues already paid</h1></div>)
      : (

        <div>
          <div>
            <h1>Payment Due: $100 </h1>
          </div>

          <div>
            {paymentStatus ? (<PaymentComplete />)
            : (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm onPaymentComplete={handlePaymentStatus}/>
              </Elements>
            )}
          </div>
        </div>

      )}
      
    </div>
  )
}

export default Dues;