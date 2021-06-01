import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../fireConfig";
import { FormContainer, InputField, SubmitButton } from "../components/form";

// TODO: Getting a Bad Request console error when creating user, look into it.
// TODO: Can create account without verifying email. How should verification be enforced?
// TODO: No user feedback when creating an account.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  const validPassword = (password: string) => {
    // Regex magic...
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let invalid = false;

    if (!validPassword(password)) {
      invalid = true;

      tempNotification(
        "Passordet er for svakt.\nDet må ha minst 8 tegn, minst en liten bokstav, minst en stor bokstav og minst et nummer.",
        8000
      );
    } else if (password !== passwordConf) {
      invalid = true;

      tempNotification(
        "Passordet stemmer ikke med bekreftelses passordet",
        3000
      );
    }

    if (invalid) {
      setPassword("");
      setPasswordConf("");
      return;
    }

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential?.user
          ?.sendEmailVerification()
          .then(() => {
            console.log("Sent email verification");
          })
          .catch(() => {
            console.log("Could not send email verification");
          });

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
    </>
  );
};

export default Register;
