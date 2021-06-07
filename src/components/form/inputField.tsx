import { Form } from "react-bootstrap";

declare type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

interface InputFieldProps {
  label?: string | undefined;
  description?: string | undefined;
  type?: string | undefined;
  value?: string | number | string[] | undefined;
  onChange?: (event: React.ChangeEvent<FormControlElement>) => void;
}

const InputField = (props: InputFieldProps) => {
  const { type, value, description, label, onChange } = props;
  return (
    <Form.Group>
      {label ? <Form.Label>{label}</Form.Label> : undefined}
      {description ? <Form.Text>{"\n" + description}</Form.Text> : undefined}
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
      ></Form.Control>
    </Form.Group>
  );
};
export default InputField;
