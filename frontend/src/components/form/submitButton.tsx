import { Button } from "../button";
import { IconType } from "../../icons";
import { IconWrapper } from "../button/button.styled";

interface SubmitButtonProps {
  label: string;
  icon?: IconType;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { label, icon } = props;
  return (
    <Button type="submit" icon={icon}>
      {label}
    </Button>
  );
};

export default SubmitButton;
