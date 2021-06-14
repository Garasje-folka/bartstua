import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import {
  changePassword,
  changePasswordErrors,
} from "../services/userManagement";
import { Notification, NotificationType } from "../components/notification";
import tempStateChange from "./helpers/tempStateChange";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  // TODO: Why is async needed here if there is no await?
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (newPassword !== newPasswordConf) {
      tempStateChange<string>(
        "Det nye passordet stemmer ikke med bekreftelses passordet",
        "",
        setNotification,
        3000
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
          changePasswordErrors;

        switch (error) {
          case ERROR_WRONG_PASSWORD:
            tempStateChange<string>(
              "Du har ikke skrevet riktig passord",
              "",
              setNotification,
              3000
            );
            setCurrentPassword("");
            break;
          case ERROR_WEAK_PASSWORD:
            tempStateChange<string>(
              "Det nye passordet er for svakt",
              "",
              setNotification,
              3000
            );
            setNewPassword("");
            setNewPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setCurrentPassword("");
            setNewPassword("");
            setNewPasswordConf("");
            tempStateChange<string>(
              "Noe gikk galt...",
              "",
              setNotification,
              3000
            );
            break;
        }
      });
  };

  return (
    <>
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
        <SubmitButton label="Bytt passord" />
      </FormContainer>

      <Notification
        heading={notification}
        type={NotificationType.ERROR}
      ></Notification>
    </>
  );
};

export { PasswordChange };
