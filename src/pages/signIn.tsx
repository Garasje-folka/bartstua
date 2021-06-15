import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { HOME } from "../router/routeConstants";
import { useTranslation } from "react-i18next";
import { Notification, NotificationType } from "../components/notification";
import { InputFieldSize } from "../components/form/inputField";

// TODO: Getting a bad request error when trying to log in with a valid email, but wrong password.

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

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
            setErrorMessage("Ugyldig e-post");
            setEmail("");
            break;

          case signInErrorCodes.ERROR_USER_NOT_FOUND:
            setErrorMessage("Det finnes ingen brukere med den e-posten");
            setEmail("");
            setPassword("");
            break;

          case signInErrorCodes.ERROR_WRONG_PASSWORD:
            setErrorMessage("Feil passord");
            setPassword("");
            break;

          default:
            setErrorMessage("Noe gikk galt");
            setEmail("");
            setPassword("");
            break;
        }
      });
  };

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

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
              size={InputFieldSize.SMALL}
              errorText="Litt dårlig epost"
              errorSerious
            />

            <InputField
              type="password"
              value={password}
              label="Passord"
              onChange={handlePasswordChange}
              size={InputFieldSize.SMALL}
            />

            <SubmitButton label={t("label_sign_in")} />
          </FormContainer>

          {errorMessage && (
            <Notification
              heading={"Innlogging feilet"}
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

export { SignIn };
