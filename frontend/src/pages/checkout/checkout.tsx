import { FormEvent, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { confirmReservationPayment } from "../../services/bookingManagement";
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

const Checkout = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );
  const stripe = useStripe();
  const elements = useElements();

  const { t } = useTranslation();
  const currentUser = useSelector(currentUserSelector);
  const history = useHistory();

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

    if (!stripe || !elements) return;

    if (!currentUser?.email && !validate(email)) {
      setEmailError("Ugyldig e-post");
      return;
    }

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
