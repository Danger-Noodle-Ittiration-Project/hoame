import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QDFF8ANkqZlajimnVkDMJarXgUWm0caTKBB9CEtRfcZrBo32Z7mbrEvcbrSpWGCBKYPgt4Dah7YOEjEHawhhsJO00asjxLGZo');

const CheckoutForm = ({ onPaymentComplete }) => {
  // const stripe = useStripe();
  const elements = useElements();
  const [stripe, setStripe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Ensure stripe is available for redirectToCheckout
    stripePromise.then((stripe) => setStripe(stripe));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements) return;

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const amount = 10000; //cents

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({amount}),
    });

    const session = await res.json();
    console.log('session', session.id)

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your return_url. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the return_url.
      await fetch('http://localhost:3000/api/dues/paid', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      onPaymentComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <PaymentElement /> */}
      <div className='payButtonContainer'>
        <button type="button" onClick={handleSubmit} disabled={!stripe || !elements} className='payButton'>
          Submit Payment
        </button>
      </div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;