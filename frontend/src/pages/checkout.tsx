import React, { FormEvent } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { confirmReservationPayment } from "../services/bookingManagement";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleCardConfirmation = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const payment = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (!payment.paymentMethod) return;

    try {
      const result = await confirmReservationPayment(payment.paymentMethod.id);

      if (result.status === "succeeded") {
        console.log("Payment succeeded!");
      } else {
        console.log("Payment failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCardConfirmation}>
        <CardElement />
        <button disabled={!stripe}> Confirm order </button>
      </form>
    </div>
  );
};
export { Checkout };
