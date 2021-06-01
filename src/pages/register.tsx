import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../fireConfig";

// TODO: It is currently possible to create users with non existent emails, add email confirmation?
// TODO: Getting a Bad Request console error when creating user, look into it.
// TODO: Need stronger password criteria. Any password with at least 6 chars pass.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

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

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use")
          tempNotification("E-posten er allerede i bruk", 3000);
        else if (error.code === "auth/invalid-email")
          tempNotification("E-posten er ikke gydlig", 3000);
        else if (error.code === "auth/weak-password")
          tempNotification("Passordet er for svakt", 3000);
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

        <Form.Group>
          <Form.Label>Bekreft passord</Form.Label>
          <Form.Control
            type="password"
            value={passwordConf}
            onChange={(event) => setPasswordConf(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit"> Registrer deg </Button>
      </Form>

      <h4> {notification} </h4>
    </>
  );
};

export default Register;
