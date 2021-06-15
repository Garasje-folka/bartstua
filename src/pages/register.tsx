import { useState, FormEvent } from "react";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { useTranslation } from "react-i18next";
import { Notification, NotificationType } from "../components/notification";

// TODO: Getting a Bad Request console error when creating user, look into it.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConf) {
      setErrorMessage("Passordet stemmer ikke med bekreftelses passordet");
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
        } = userManagement.createUserErrorCodes;

        switch (error.code) {
          case ERROR_EMAIL_ALREADY_USED:
            setErrorMessage("E-posten er allerede i bruk");
            setEmail("");
            break;
          case ERROR_EMAIL_NOT_VALID:
            setErrorMessage("E-posten er ikke gyldig");
            setEmail("");
            break;
          case ERROR_WEAK_PASSWORD:
            setErrorMessage("Passordet er for svakt");
            setPassword("");
            setPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setErrorMessage("Noe gikk galt");
            setEmail("");
            setPassword("");
            setPasswordConf("");
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
          {errorMessage && (
            <Notification
              heading="Registrering feilet"
              type={NotificationType.ERROR}
            >
              {errorMessage}
            </Notification>
          )}
        </CardBody>
      </CardContainer>
    </>
  );
};

export { Register };
