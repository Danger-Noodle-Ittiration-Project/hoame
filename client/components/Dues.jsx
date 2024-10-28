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

const Dues = () => {

  const getDuesStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/dues`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log('Fetched data:', data);
      // setAnnouncements(data); // insert the fetch into state
    } catch (error) {
      console.log('error fetching users:', error);
    }
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
      <div>
        <h1>Payment Due: </h1>
      </div>

      <div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>

    </div>
  )
}

export default Dues;