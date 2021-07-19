import { validate } from "email-validator";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { InputFieldSize } from "../../components/form/inputField";
import { Heading, Paragraph } from "../../components/text";
import {
  Background,
  ContentCentral,
  ContentContainer,
  ContentHeader,
  EmailField,
  FieldContainer,
  ResetButton,
  InfoContainer,
  InfoBox,
} from "./emailResetPassword.styled";

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
              />
              <ResetButton onClick={handleSubmit}>
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
