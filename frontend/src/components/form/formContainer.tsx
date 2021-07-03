import React, { FormEvent } from "react";
import Form from "react-bootstrap/Form";

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (event: FormEvent) => void;
  className?: string;
}

const FormContainer = (props: FormContainerProps) => {
  const { children, onSubmit, className } = props;

  const handleSubmit = (event: FormEvent) => {
    onSubmit(event);
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      {children}
    </Form>
  );
};
export default FormContainer;
