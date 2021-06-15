import { IconType } from "../../icons";
import { IconWrapper, StyledButton } from "./button.styled";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  children?: string;
  className?: string;
  icon?: IconType;
  type?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, className, icon, type } = props;
  const Icon = icon;
  return (
    <StyledButton className={className} onClick={onClick} type={type}>
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
