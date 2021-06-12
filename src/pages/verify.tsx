import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { sendEmailVerification } from "../services/userManagement";
import { CardContainer, CardHeader } from "../components/card";

const Verify = () => {
  const user = useSelector(currentUserSelector);
  const [retry, setRetry] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");

  const sendVerification = () => {
    if (!user) return;
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
      <CardContainer>
        <CardHeader title="Du må verifisere e-posten din" />
        <Button onClick={sendVerification}>
          {retry ? "Prøv å sende på nytt" : "Send verifikasjons e-post"}
        </Button>
        <h4>{notification}</h4>
      </CardContainer>
    </>
  );
};

export default Verify;
