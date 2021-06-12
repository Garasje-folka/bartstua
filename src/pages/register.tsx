import { useState, FormEvent } from "react";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader } from "../components/card";

// TODO: Getting a Bad Request console error when creating user, look into it.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConf) {
      tempNotification(
        "Passordet stemmer ikke med bekreftelses passordet",
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
            tempNotification("E-posten er allerede i bruk", 3000);
            break;
          case ERROR_EMAIL_NOT_VALID:
            tempNotification("E-posten er ikke gyldig", 3000);
            break;
          case ERROR_WEAK_PASSWORD:
            tempNotification("Passordet er for svakt", 3000);
            break;
          case ERROR_UNKNOWN:
            tempNotification("Noe gikk galt...", 3000);
            break;
        }
      });
  };

  const tempNotification = (message: string, duration: number) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  return (
    <>
      <CardContainer>
        <CardHeader title="Registrer" />
        <FormContainer onSubmit={handleSubmit}>
          <InputField
            label="E-post"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputField
            label="Passord"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputField
            label="Bekreft passord"
            type="password"
            value={passwordConf}
            onChange={(event) => setPasswordConf(event.target.value)}
          />
          <SubmitButton label="Registrer deg" />
        </FormContainer>

        <h4> {notification} </h4>
      </CardContainer>
    </>
  );
};

export default Register;
