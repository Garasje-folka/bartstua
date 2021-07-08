import { FormEvent, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { confirmReservationPayment } from "../../services/bookingManagement";
import { useTranslation } from "react-i18next";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { currentUserSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { cardElementOptions, WidthRestriction } from "./checkout.styled";

const Checkout = () => {
  const [email, setEmail] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const { t } = useTranslation();
  const currentUser = useSelector(currentUserSelector);

  const handleSubmit = async (event: FormEvent) => {
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
      console.log(result.status);
    } catch (error) {
      console.log(error.message);
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
                onChange={(event) => setEmail(event.target.value)}
              />
            )}
            <CardElement options={cardElementOptions} />
            <SubmitButton label="Betal" />
          </WidthRestriction>
        </FormContainer>
      </CardBody>
    </CardContainer>
  );
};
export { Checkout };
