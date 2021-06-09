import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { sendEmailVerification } from "../services/userManagement";

const Verify = () => {
  const user = useSelector(currentUserSelector);
  const [retry, setRetry] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");

  const sendVerification = () => {
    sendEmailVerification()
      .then(() => {
        setNotification(
          "En verifikasjons e-post har blitt sendt til " + user.email
        );
      })
      .catch((error) => {
        setNotification("Noe gikk galt");
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
