import { IconType } from "../../icons";
import { IconWrapper, StyledButton } from "./button.styled";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  children?: string;
  className?: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, className, icon } = props;
  const Icon = icon;
  return (
    <StyledButton className={className} onClick={onClick}>
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
