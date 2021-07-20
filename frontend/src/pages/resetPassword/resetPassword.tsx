import { validate } from "email-validator";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { InputFieldSize } from "../../components/form/inputField";
import { Heading, Paragraph } from "../../components/text";
import { SIGNIN } from "../../router/routeConstants";
import {
  sendPasswordResetEmail,
  sendPasswordResetEmailErrors,
} from "../../services/userManagement";
import {
  Background,
  ContentCentral,
  ContentContainer,
  ContentHeader,
  FieldContainer,
  InfoContainer,
  InfoBox,
  EmailField,
  ResetButton,
} from "./resetPassword.styled";

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
    try {
      await sendPasswordResetEmail(email);
      history.push(SIGNIN);
    } catch (error) {
      switch (error.code) {
        case sendPasswordResetEmailErrors.ERROR_INVALID_EMAIL:
          setEmailError("Ugyldig e-post");
          break;
        case sendPasswordResetEmailErrors.ERROR_USER_NOT_FOUND:
          setEmailError("Ingen bruker tilknyttet e-posten");
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
      <Background>
        <ContentContainer>
          <ContentHeader>
            <Heading type={Heading.types.HEADING2}>
              {t("label_forgot_password")}
            </Heading>
          </ContentHeader>
          <ContentCentral>
            <FieldContainer>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_email")}
              </Paragraph>
              <EmailField
                ghostText="E-post"
                size={InputFieldSize.SMALL}
                onChange={(event) => onEmailChanged(event.target.value)}
                errorSerious={true}
                errorText={emailError}
              />
              <ResetButton
                onClick={handleSubmit}
                disabled={!!emailError || !email}
              >
                {t("label_reset_button")}
              </ResetButton>
            </FieldContainer>
            <InfoContainer>
              <InfoBox>{t("label_email_reset_password")}</InfoBox>
            </InfoContainer>
          </ContentCentral>
        </ContentContainer>
      </Background>
    </>
  );
};

export { EmailResetPassword };
