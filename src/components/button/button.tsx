import { StyledButton } from "./button.styled";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  children: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, className } = props;

  return (
    <StyledButton className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export { Button };
