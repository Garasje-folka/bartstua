import { useState, FormEvent } from "react";
import { validate } from "email-validator";
import { Paragraph } from "../../components/text";
import { EmailField, ResetButton } from "./resetPasswordEmailInput.styled";
import { InputFieldSize } from "../form/inputField";
import { useTranslation } from "react-i18next";
import {
  sendPasswordResetEmail,
  sendPasswordResetEmailErrors,
} from "../../services/userManagement";

export type ResetPasswordEmailInputProps = {
  onSuccessfulSubmit: () => void;
};

const ResetPasswordEmailInput = (props: ResetPasswordEmailInputProps) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const { t } = useTranslation();
  const { onSuccessfulSubmit } = props;

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
    try {
      // TODO: Figure out what url it should receive
      await sendPasswordResetEmail(email, "localhost:3000");
      onSuccessfulSubmit();
    } catch (error) {
      switch (error.type) {
        case sendPasswordResetEmailErrors.ERROR_INVALID_EMAIL:
          setEmailError("Ugyldig e-post");
          break;
        case sendPasswordResetEmailErrors.ERROR_USER_NOT_FOUND:
          setEmailError("Det finnes ingen brukere med den e-posten");
          break;
        default:
          setEmailError("Noe gikk galt");
          break;
      }

      setEmail("");
    }
  };

  return (
    <>
      <Paragraph type={Paragraph.types.PARAGRAPH1}>
        {t("label_email")}
      </Paragraph>
      <EmailField
        ghostText="E-post"
        size={InputFieldSize.SMALL}
        onChange={(event) => onEmailChanged(event.target.value)}
      />
      <ResetButton onClick={handleSubmit} disabled={!!emailError || !email}>
        {t("label_reset_button")}
      </ResetButton>
    </>
  );
};

export { ResetPasswordEmailInput };
