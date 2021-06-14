import { Alert } from "react-bootstrap";

interface NotificationProps {
  title?: string;
  children?: string;
  className?: string;
  type: NotificationType;
  heading?: string;
}

enum NotificationType {
  ERROR,
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { children, type, heading } = props;

  const getVariant = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ERROR:
        return "danger";
    }
  };

  return (
    <>
      {(heading || children) && (
        <Alert variant={getVariant(type)}>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{children}</p>
        </Alert>
      )}
    </>
  );
};

export { Notification, NotificationType };
