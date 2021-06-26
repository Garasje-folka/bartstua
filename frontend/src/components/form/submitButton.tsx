import { Button } from "../button";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { label } = props;
  return <Button type="submit">{label}</Button>;
};

export default SubmitButton;
