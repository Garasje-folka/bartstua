import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { sendEmailVerification } from "../services/userManagement";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { Notification, NotificationType } from "../components/notification";

const Verify = () => {
  const user = useSelector(currentUserSelector);
  const [retry, setRetry] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationHeading, setNotificationHeading] = useState<string>("");
  const [notificationType, setNotificationType] = useState<NotificationType>(
    NotificationType.ERROR
  );

  const sendVerification = () => {
    if (!user) return;
    sendEmailVerification()
      .then(() => {
        setNotificationHeading("En verifikasjons e-post har blitt sendt");
        setNotificationMessage("Sjekk " + user.email);
        setNotificationType(NotificationType.SUCCESS);
      })
      .catch((error) => {
        setNotificationHeading("Kunne ikke sende verifikasjons e-post");
        setNotificationMessage("Noe gikk galt");
        setNotificationType(NotificationType.ERROR);
      });

    setRetry(true);
  };

  return (
    <CardContainer>
      <CardHeader title="Du må verifisere e-posten din" />
      <CardBody>
        <Button onClick={sendVerification}>
          {retry ? "Prøv å sende på nytt" : "Send verifikasjons e-post"}
        </Button>
        <Notification type={notificationType} heading={notificationHeading}>
          {notificationMessage}
        </Notification>
      </CardBody>
    </CardContainer>
  );
};

export { Verify };
