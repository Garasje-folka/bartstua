import { Button, ButtonProps } from "../button";

type SubmitButtonProps = ButtonProps & {
  label: string;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { label, ...rest } = props;
  return (
    <Button {...rest} type="submit">
      {label}
    </Button>
  );
};

export default SubmitButton;
