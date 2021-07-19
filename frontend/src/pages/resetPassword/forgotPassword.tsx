import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  changePassword,
  changePasswordErrorCodes,
} from "../../services/userManagement";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { Notification, NotificationType } from "../../components/notification";
import {
  Background,
  ContentCentral,
  ContentContainer,
  ContentHeader,
  InfoBox,
  InfoContainer,
  NewPasswordField,
  PasswordContainer,
  ResetButton,
} from "./forgotPassword.styled";
import { Heading, Paragraph } from "../../components/text";
import { useTranslation } from "react-i18next";
import { InputFieldSize } from "../../components/form/inputField";
import { InformationEvent } from "http";

const ForgotPassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (newPassword !== newPasswordConf) {
      setErrorMessage(
        "Det nye passordet stemmer ikke med bekreftelses passordet"
      );
      setNewPassword("");
      setNewPasswordConf("");
      return;
    }

    changePassword(currentPassword, newPassword)
      .then(() => {
        history.push("/signin");
      })
      .catch((error) => {
        const { ERROR_WRONG_PASSWORD, ERROR_WEAK_PASSWORD, ERROR_UNKNOWN } =
          changePasswordErrorCodes;

        switch (error.code) {
          case ERROR_WRONG_PASSWORD:
            setErrorMessage(
              "Du har ikke skrevet ditt nåværende passord riktig"
            );
            setCurrentPassword("");
            break;
          case ERROR_WEAK_PASSWORD:
            setErrorMessage("Det nye passordet er for svakt");
            setNewPassword("");
            setNewPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setErrorMessage("Noe gikk galt...");
            setCurrentPassword("");
            setNewPassword("");
            setNewPasswordConf("");
            break;
        }
      });
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
            <PasswordContainer>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_new_password")}
              </Paragraph>
              <NewPasswordField
                ghostText="Nytt passord"
                size={InputFieldSize.SMALL}
                onChange={(event) => setNewPassword(event.target.value)}
              ></NewPasswordField>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_confirm_password")}
              </Paragraph>
              <NewPasswordField
                ghostText="Bekreft passord"
                size={InputFieldSize.SMALL}
                onChange={(event) => setNewPasswordConf(event.target.value)}
              />
              <ResetButton onClick={handleSubmit}>
                {t("label_reset_button")}
              </ResetButton>
            </PasswordContainer>
            <InfoContainer>
              <InfoBox>{t("label_write_password")}</InfoBox>
            </InfoContainer>
          </ContentCentral>
        </ContentContainer>
      </Background>
    </>
  );
};

export { ForgotPassword };
