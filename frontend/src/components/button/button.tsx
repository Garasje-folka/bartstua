import { IconType } from "../../icons";
import { IconWrapper, StyledButton } from "./button.styled";

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  children?: string;
  className?: string;
  icon?: IconType;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, className, icon, type, disabled } = props;
  const Icon = icon;
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export { Button };
