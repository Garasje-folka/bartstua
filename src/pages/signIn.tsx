import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { HOME } from "../router/routeConstants";
import { useTranslation } from "react-i18next";
import { Notification, NotificationType } from "../components/notification";
import tempStateChange from "./helpers/tempStateChange";

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
        tempStateChange<string>(error, "", setNotification, 3000);
        setEmail("");
        setPassword("");
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
            />

            <InputField
              type="password"
              value={password}
              label="Passord"
              onChange={handlePasswordChange}
            />

            <SubmitButton label={t("label_sign_in")} />
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

export { SignIn };
