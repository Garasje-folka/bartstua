import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import {
  changePassword,
  changePasswordErrorCodes,
} from "../services/userManagement";
import { Notification, NotificationType } from "../components/notification";
import { CardBody, Card, CardHeader, CardSizes } from "../components/card";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const history = useHistory();

  // TODO: Why is async needed here if there is no await?
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
        history.push("/");
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
      <Card size={CardSizes.FILL_PAGE}>
        <CardHeader title="Endre passord" />
        <CardBody>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              label="Nåværende passord"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <InputField
              label="Nytt passord"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <InputField
              label="Bekreft nytt passord"
              type="password"
              value={newPasswordConf}
              onChange={(event) => setNewPasswordConf(event.target.value)}
            />
            <SubmitButton label="Endre passord" />
          </FormContainer>

          {errorMessage && (
            <Notification
              heading="Passordbytte feilet"
              type={NotificationType.ERROR}
            >
              {errorMessage}
            </Notification>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export { PasswordChange };
