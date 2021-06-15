import { Alert } from "react-bootstrap";

interface NotificationProps {
  title?: string;
  children?: string;
  className?: string;
  type: NotificationType;
  heading?: string;
}

enum NotificationType {
  ERROR = "danger",
  SUCCESS = "success",
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { children, type, heading } = props;

  return (
    <>
      {(heading || children) && (
        <Alert variant={type}>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{children}</p>
        </Alert>
      )}
    </>
  );
};

export { Notification, NotificationType };
