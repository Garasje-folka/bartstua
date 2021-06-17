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

  const { t } = useTranslation();

  const [errorEmail1, setErrorEmail1] = useState<undefined | string>();
  const [errorPassword1, setErrorPassword1] = useState<undefined | string>();
  const [errorPassword2, setErrorPassword2] = useState<undefined | string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConf) {
      setErrorPassword2("Passordet stemmer ikke med bekreftelses passordet");
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
            setErrorEmail1("E-posten er allerede i bruk");
            setErrorPassword1("");
            setErrorPassword2("");
            setEmail("");
            break;
          case ERROR_EMAIL_NOT_VALID:
            setErrorEmail1("E-posten er ikke gyldig");
            setErrorPassword1("");
            setErrorPassword2("");
            setEmail("");
            break;
          case ERROR_WEAK_PASSWORD:
            setErrorEmail1("");
            setErrorPassword2("");
            setErrorPassword1("Passordet er for svakt");
            setPassword("");
            setPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setErrorEmail1("");
            setErrorPassword1("");
            setErrorPassword2("Noe gikk galt");
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
              errorSerious
              errorText={errorEmail1}
            />
            <InputField
              label={t("label_password")}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              errorSerious
              errorText={errorPassword1}
            />
            <InputField
              label={t("label_confirm_password")}
              type="password"
              value={passwordConf}
              onChange={(event) => setPasswordConf(event.target.value)}
              errorSerious
              errorText={errorPassword2}
            />
            <SubmitButton label={t("label_register_user")} />
          </FormContainer>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { Register };
