import { useState, FormEvent } from "react";
import { auth } from "../fireConfig";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../components/form";

// TODO: Getting a bad request error when trying to log in with a valid email, but wrong password.

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        tempNotification(error.message, 3000);
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
    </>
  );
};

export default Login;
