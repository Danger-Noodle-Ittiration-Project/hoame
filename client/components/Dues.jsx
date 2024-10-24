import React, {useState} from 'react';
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