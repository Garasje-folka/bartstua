import { FormEvent, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { currentUserSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { cardElementOptions, WidthRestriction } from "./checkout.styled";
import { useHistory } from "react-router-dom";
import { HOME } from "../../router/routeConstants";
import { Notification, NotificationType } from "../../components/notification";
import { validate } from "email-validator";
import { useEffect } from "react";
import { PaymentIntent } from "@stripe/stripe-js";
import { createBookingPaymentIntent } from "../../services/bookingManagement/createBookingPaymentIntent";
import { refreshReservationTimestamps } from "../../services/bookingManagement";

const Checkout = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );
  const [paymentIntent, setPaymentIntent] = useState<
    PaymentIntent | undefined
  >();
  const stripe = useStripe();
  const elements = useElements();

  const { t } = useTranslation();
  const currentUser = useSelector(currentUserSelector);
  const history = useHistory();

  useEffect(() => {
    refreshReservationTimestamps()
      .then(() => {
        // TODO: Add support for guest users
        if (!currentUser?.email) return null;
        return createBookingPaymentIntent(currentUser.email);
      })
      .then((res) => {
        if (res) setPaymentIntent(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEmailChanged = (newEmail: string) => {
    if (!validate(newEmail)) {
      setEmailError("Ugyldig e-post");
    } else {
      setEmailError(undefined);
    }

    setEmail(newEmail);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !currentUser || !paymentIntent?.client_secret)
      return;

    if (!currentUser.email && !validate(email)) {
      setEmailError("Ugyldig e-post");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return; // TODO: Throw error?

    // TODO: Assert that no reservations have expired?

    try {
      await refreshReservationTimestamps();
      const result = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: card,
          },
        }
      );

      const resultIntent = result.paymentIntent;
      const action = resultIntent?.next_action;

      if (action && action.type === "redirect_to_url") {
        if (action.redirect_to_url?.url) {
          window.location.href = action.redirect_to_url.url;
        }
      }

      if (resultIntent?.status === "succeeded") {
        // TODO: Redirect to success page
        history.push(HOME);
      } else {
        setPaymentError("Noe gikk galt!");
      }
    } catch (error) {
      setPaymentError("Noe gikk galt!");
    }
  };

  return (
    <CardContainer>
      <CardHeader title="Checkout" />
      <CardBody>
        <FormContainer onSubmit={handleSubmit}>
          <WidthRestriction>
            {(!currentUser || !currentUser.email) && (
              <InputField
                label={t("label_email")}
                type="email"
                value={email}
                onChange={(event) => onEmailChanged(event.target.value)}
                errorSerious={false}
                errorText={emailError}
              />
            )}
            <CardElement options={cardElementOptions} />
            <SubmitButton
              label="Betal"
              disabled={!stripe || !elements || !!emailError}
            />
            {paymentError && (
              <Notification
                heading="Betaling feilet"
                type={NotificationType.ERROR}
              >
                {paymentError}
              </Notification>
            )}
          </WidthRestriction>
        </FormContainer>
      </CardBody>
    </CardContainer>
  );
};

export { Checkout };
