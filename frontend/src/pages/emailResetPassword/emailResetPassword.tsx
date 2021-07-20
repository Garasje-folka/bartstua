import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ConfirmResetPassword } from "../../components/confirmResetPassword";
import { ResetPasswordEmailInput } from "../../components/resetPasswordEmailInput";
import { Heading } from "../../components/text";
import { SIGNIN } from "../../router/routeConstants";
import {
  Background,
  ContentCentral,
  ContentContainer,
  ContentHeader,
  FieldContainer,
  InfoContainer,
  InfoBox,
} from "./emailResetPassword.styled";

enum ResetPasswordState {
  INPUT_EMAIL,
  INPUT_NEW_PASSWORD,
}

const EmailResetPassword = () => {
  const [resetPasswordState, setResetPasswordState] =
    useState<ResetPasswordState>(ResetPasswordState.INPUT_EMAIL);

  const { t } = useTranslation();
  const history = useHistory();

  const onSuccessfulSubmit = () => {
    switch (resetPasswordState) {
      case ResetPasswordState.INPUT_EMAIL:
        setResetPasswordState(ResetPasswordState.INPUT_NEW_PASSWORD);
        break;
      case ResetPasswordState.INPUT_NEW_PASSWORD:
        history.push(SIGNIN);
        break;
    }
  };

  const getStateComponent = () => {
    switch (resetPasswordState) {
      case ResetPasswordState.INPUT_EMAIL:
        return (
          <ResetPasswordEmailInput onSuccessfulSubmit={onSuccessfulSubmit} />
        );

      case ResetPasswordState.INPUT_NEW_PASSWORD:
        return <ConfirmResetPassword onSuccessfulSubmit={onSuccessfulSubmit} />;
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
            <FieldContainer>{getStateComponent()}</FieldContainer>
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
