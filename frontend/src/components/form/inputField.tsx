import { Form } from "react-bootstrap";
import { IconType } from "../../icons";
import {
  Error,
  StyledFormGroup,
  StyledFormControl,
  Wrapper,
  IconWrapper,
  StyledIcon,
} from "./inputField.styled";

declare type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

enum InputFieldSize {
  REGULAR = "REGULAR",
  SMALL = "SMALL",
}

interface InputFieldProps {
  label?: string;
  description?: string;
  type?: string;
  value?: string | number | string[];
  onChange?: (event: React.ChangeEvent<FormControlElement>) => void;
  errorText?: string;
  errorSerious?: boolean;
  size?: InputFieldSize;
  ghostText?: string;
  largeSpacing?: boolean;
  icon?: IconType;
  className?: string;
}

type InputFieldType = React.FC<InputFieldProps> & {
  //sizes: { [key: string]: InputFieldSize };
};

const InputField: InputFieldType = (props) => {
  const {
    type,
    value,
    description,
    label,
    onChange,
    errorText,
    errorSerious,
    size,
    ghostText,
    largeSpacing,
    icon,
    className,
  } = props;

  return (
    <Wrapper
      className={className}
      $size={size}
      $largeSpacing={largeSpacing || false}
    >
      <StyledFormGroup>
        {icon && (
          <IconWrapper>
            <StyledIcon icon={icon} />
          </IconWrapper>
        )}
        {label ? <Form.Label>{label}</Form.Label> : undefined}
        {description ? <Form.Text>{"\n" + description}</Form.Text> : undefined}
        <StyledFormControl
          type={type}
          value={value}
          onChange={onChange}
          $isError={!!errorText}
          $serious={errorSerious}
          placeholder={ghostText}
        />
        <Error serious={errorSerious}>{errorText}</Error>
      </StyledFormGroup>
    </Wrapper>
  );
};

InputField.defaultProps = {
  size: InputFieldSize.REGULAR,
};

export { InputField, InputFieldSize };
