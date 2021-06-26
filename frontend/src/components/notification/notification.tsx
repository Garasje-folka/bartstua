import {
  NotificationContainer,
  NotificationHeading,
  NotificationText,
} from "./";

interface NotificationProps {
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
        <NotificationContainer variant={type}>
          <NotificationHeading>{heading}</NotificationHeading>
          <NotificationText>{children}</NotificationText>
        </NotificationContainer>
      )}
    </>
  );
};

export { Notification, NotificationType };
