import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  changePassword,
  changePasswordErrorCodes,
} from "../../services/userManagement";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { Notification, NotificationType } from "../../components/notification";

const ForgotPassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const history = useHistory();

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

  return <></>;
};

export { ForgotPassword };
