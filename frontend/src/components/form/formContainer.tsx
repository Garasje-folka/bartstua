import React, { FormEvent } from "react";
import Form from "react-bootstrap/Form";

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (event: FormEvent) => {};
}

const FormContainer = (props: FormContainerProps) => {
  const { children, onSubmit } = props;

  const handleSubmit = (event: FormEvent) => {
    onSubmit(event);
  };

  return <Form onSubmit={handleSubmit}>{children}</Form>;
};
export default FormContainer;
