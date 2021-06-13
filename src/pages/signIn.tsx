import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { HOME } from "../router/routeConstants";
import { useTranslation } from "react-i18next";
import { signInErrorCodes } from "../services/userManagement";

// TODO: Getting a bad request error when trying to log in with a valid email, but wrong password.

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await userManagement
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(HOME);
      })
      .catch((error) => {
        const { signInErrorCodes } = userManagement;

        switch (error.code) {
          case signInErrorCodes.ERROR_INVALID_EMAIL:
            tempNotification("Ugyldig e-post", 3000);
            setEmail("");
            break;

          case signInErrorCodes.ERROR_USER_NOT_FOUND:
            tempNotification("Det finnes ingen brukere med den e-posten", 3000);
            setEmail("");
            setPassword("");
            break;

          case signInErrorCodes.ERROR_WRONG_PASSWORD:
            tempNotification("Feil passord", 3000);
            setPassword("");
            break;

          default:
            tempNotification("Noe gikk galt", 3000);
            setEmail("");
            setPassword("");
            break;
        }
      });
  };

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  // TODO: Duplicate code, same as in register.tsx. How can it be removed?
  const tempNotification = (message: string, duration: number) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  return (
    <>
      <CardContainer>
        <CardHeader title={t("label_sign_in")} />
        <CardBody>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              type="email"
              value={email}
              label={t("label_email")}
              onChange={handleEmailChange}
            />

            <InputField
              type="password"
              value={password}
              label="Passord"
              onChange={handlePasswordChange}
            />

            <SubmitButton label={t("label_sign_in")} />
          </FormContainer>

          <h4> {notification} </h4>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { SignIn };
