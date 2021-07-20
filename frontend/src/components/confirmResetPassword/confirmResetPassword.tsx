import { useState, FormEvent } from "react";
import { Paragraph } from "../../components/text";
import {
  NewPasswordField,
  ResetButton,
  CodeField,
} from "./confirmResetPassword.styled";
import { InputFieldSize } from "../form/inputField";
import { useTranslation } from "react-i18next";
import {
  confirmPasswordReset,
  confirmPasswordResetErrors,
} from "../../services/userManagement";
import { Notification, NotificationType } from "../notification";

export type ConfirmResetPasswordProps = {
  onSuccessfulSubmit: () => void;
};

const ConfirmResetPassword = (props: ConfirmResetPasswordProps) => {
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");

  const [codeError, setCodeError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");

  const { t } = useTranslation();

  const { onSuccessfulSubmit } = props;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault;

    if (newPassword !== newPasswordConf) {
      setPasswordError(
        "Det nye passordet stemmer ikke med bekreftelses passordet"
      );
      setNewPassword("");
      setNewPasswordConf("");
      return;
    }

    try {
      await confirmPasswordReset(code, newPassword);
      onSuccessfulSubmit();
    } catch (error) {
      switch (error.code) {
        case confirmPasswordResetErrors.ERROR_EXPIRED_CODE:
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Paragraph type={Paragraph.types.PARAGRAPH1}>
        {t("label_new_password")}
      </Paragraph>
      <CodeField
        ghostText="Gitt kode"
        size={InputFieldSize.SMALL}
        onChange={(event) => setCode(event.target.value)}
      />
      <NewPasswordField
        ghostText="Nytt passord"
        size={InputFieldSize.SMALL}
        onChange={(event) => setNewPassword(event.target.value)}
        type="password"
      />
      <Paragraph type={Paragraph.types.PARAGRAPH1}>
        {t("label_confirm_password")}
      </Paragraph>
      <NewPasswordField
        ghostText="Bekreft passord"
        size={InputFieldSize.SMALL}
        onChange={(event) => setNewPasswordConf(event.target.value)}
        type="password"
      />
      <ResetButton
        onClick={handleSubmit}
        disabled={!code || !newPassword || !!passwordError}
      >
        {t("label_reset_button")}
      </ResetButton>
    </>
  );
};

export { ConfirmResetPassword };
