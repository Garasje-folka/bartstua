import { FormEvent, useState } from "react";
import { FormContainer, InputField, SubmitButton } from "../components/form";

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="Nytt passord"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <InputField
          label="Bekreft nytt passord"
          type="password"
          value={newPasswordConf}
          onChange={(event) => setNewPasswordConf(event.target.value)}
        />
        <SubmitButton label="Bytt passord" />
      </FormContainer>
    </>
  );
};

export default PasswordChange;
