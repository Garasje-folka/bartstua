import { useState, FormEvent } from "react";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { useTranslation } from "react-i18next";
import { Notification, NotificationType } from "../components/notification";
import tempStateChange from "./helpers/tempStateChange";

// TODO: Getting a Bad Request console error when creating user, look into it.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConf) {
      tempStateChange<string>(
        "Passordet stemmer ikke med bekreftelses passordet",
        "",
        setNotification,
        3000
      );
      setPassword("");
      setPasswordConf("");
      return;
    }

    await userManagement
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const {
          ERROR_EMAIL_ALREADY_USED,
          ERROR_EMAIL_NOT_VALID,
          ERROR_UNKNOWN,
          ERROR_WEAK_PASSWORD,
        } = userManagement.createUserErrors;

        switch (error) {
          case ERROR_EMAIL_ALREADY_USED:
            tempStateChange<string>(
              "E-posten er allerede i bruk",
              "",
              setNotification,
              3000
            );
            break;
          case ERROR_EMAIL_NOT_VALID:
            tempStateChange<string>(
              "E-posten er ikke gyldig",
              "",
              setNotification,
              3000
            );
            break;
          case ERROR_WEAK_PASSWORD:
            tempStateChange<string>(
              "Passordet er for svakt",
              "",
              setNotification,
              3000
            );
            break;
          case ERROR_UNKNOWN:
            tempStateChange<string>(
              "Passordet er for svakt",
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
      <CardContainer>
        <CardHeader title={t("label_register")} />
        <CardBody>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              label={t("label_email")}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputField
              label={t("label_password")}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <InputField
              label={t("label_confirm_password")}
              type="password"
              value={passwordConf}
              onChange={(event) => setPasswordConf(event.target.value)}
            />
            <SubmitButton label={t("label_register_user")} />
          </FormContainer>

          <Notification
            heading={notification}
            type={NotificationType.ERROR}
          ></Notification>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { Register };
