import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import useGlobalState from "../hooks/useGlobalState";

const Verify = () => {
  const { currentUser: user } = useGlobalState();
  const [retry, setRetry] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  // TODO: Should set up proper routing guards instead
  useEffect(() => {
    if (!user) history.push("/");
  }, [user, history]);

  const sendVerification = () => {
    user
      ?.sendEmailVerification()
      .then(() => {
        setNotification(
          "En verifikasjons e-post har blitt sendt til " + user.email
        );
      })
      .catch((error) => {
        setNotification("Noe gikk galt");
        console.log(error.code);
      });

    setRetry(true);
  };

  return (
    <>
      <h2> Du må verifisere e-posten din</h2>
      <Button onClick={sendVerification}>
        {retry ? "Prøv å sende på nytt" : "Send verifikasjons e-post"}
      </Button>
      <h4>{notification}</h4>
    </>
  );
};

export default Verify;
