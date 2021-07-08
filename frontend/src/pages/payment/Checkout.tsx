import React, {FormEvent, useState} from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { confirmReservationPayment } from "../../services/bookingManagement";
import "./checkout.css"


const Checkout = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
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

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event:any) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div>
            <form id="payment-form" onSubmit={handleCardConfirmation}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
                <button disabled={!stripe} id={"submit"}>
                    <span id="button-text">
                      {processing ? (
                          <div className="spinner" id="spinner"/>
                      ) : (
                          "Pay now"
                      )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a> Refresh the page to pay again.
                </p>
            </form>
        </ div>
    )
}
export { Checkout };
