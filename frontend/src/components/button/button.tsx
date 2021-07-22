import { Icon, IconType } from "../../icons";
import { IconWrapper, StyledButton } from "./button.styled";

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  children?: string;
  className?: string;
  icon?: IconType;
  type?: string;
  disabled?: boolean;
  buttonStyle?: string;
}

export const ButtonStyle = {
  REGULAR: "REGULAR",
  TRANSPARENT: "TRANSPARENT",
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onClick,
    children,
    className,
    icon,
    type,
    disabled,
    buttonStyle = ButtonStyle.REGULAR,
  } = props;
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      buttonStyle={buttonStyle}
    >
      {children}
      {icon && (
        <IconWrapper hasLabel={!!children}>
          <Icon icon={icon} />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export { Button };
