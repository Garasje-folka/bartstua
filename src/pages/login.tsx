import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { HOME } from "../router/routeConstants";

// TODO: Getting a bad request error when trying to log in with a valid email, but wrong password.

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await userManagement
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(HOME);
      })
      .catch((error) => {
        tempNotification(error, 3000);
        setEmail("");
        setPassword("");
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
        <CardHeader title="Logg inn" />
        <CardBody>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              type="email"
              value={email}
              label="E-post"
              onChange={handleEmailChange}
            />

            <InputField
              type="password"
              value={password}
              label="Passord"
              onChange={handlePasswordChange}
            />

            <SubmitButton label="Logg inn" />
          </FormContainer>

          <h4> {notification} </h4>
        </CardBody>
      </CardContainer>
    </>
  );
};

export default Login;
