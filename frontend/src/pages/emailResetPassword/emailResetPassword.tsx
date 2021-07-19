import { validate } from "email-validator";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Background } from "./emailResetPassword.styled";

const EmailResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const { t } = useTranslation();
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
  };

  return (
    <>
      <Background>hei</Background>
    </>
  );
};

export { EmailResetPassword };
