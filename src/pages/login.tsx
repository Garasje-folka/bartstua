import { useState, FormEvent } from "react";
import { auth } from "../fireConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

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

  // TODO: Duplicate code, same as in register.tsx. How can it be removed?
  const tempNotification = (message: string, duration: number) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>E-post</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Passord</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit"> Logg inn </Button>
      </Form>

      <h4> {notification} </h4>
    </>
  );
};

export default Login;
