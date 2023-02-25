import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Mf3ndSCnM9PGSKT6wV2bnXpOFWYVg008Omp7VeXjbxzCvO2x8EWHZafq2SNz9nGetPuqsAWHnEFFe2y9q5sZv8C00R5J3eQDe"
);

export default function Payment(props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt", amount: props?.amount }],
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log(clientSecret);

  return (
    <div className="mt-10">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            price={props?.price}
            tokenId={props?.tokenId}
            accountAddress={props?.accountAddress}
          />
        </Elements>
      )}
    </div>
  );
}
