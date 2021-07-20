import { useState, FormEvent } from "react";
import { userManagement } from "../../services";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCallback } from "react";
import {
  ActionsContainer,
  Background,
  CenterContainer,
  EmailField,
  HeadingContainer,
  LeftContainer,
  PasswordField,
  RightContainer,
  SignUpContainer,
  SignUpHeader,
  SignUpLabel,
  SignUpButton,
  StyledFormContainer,
  OuterFormContainer,
  ParagraphContainer,
} from "../signUp/signUp.styled";
import { Heading, Paragraph } from "../../components/text";
import { EmailIcon, PasswordIcon, SignInIcon, SignUpIcon } from "../../icons";
import { InputFieldSize } from "../../components/form/inputField";
import { SignInButton } from "../../components/header/header.styled";
import { SIGNIN } from "../../router/routeConstants";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const { t } = useTranslation();

  const [errorEmail, setErrorEmail] = useState<undefined | string>();
  const [errorPassword1, setErrorPassword1] = useState<undefined | string>();
  const [errorPassword2, setErrorPassword2] = useState<undefined | string>();
  const [serious, setSerious] = useState<boolean>(false);

  const resetFieldErrors = () => {
    setErrorEmail(undefined);
    setErrorPassword1(undefined);
    setErrorPassword2(undefined);
  };

  const checkPasswordFields = useCallback(() => {
    if (password !== passwordConf) {
      setErrorPassword2(t("text_passwords_not_matching"));

      return false;
    } else {
      setErrorPassword2(undefined);
      return true;
    }
  }, [password, passwordConf, t]);

  useEffect(() => {
    checkPasswordFields();
  }, [checkPasswordFields]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    resetFieldErrors();

    setSerious(true);

    if (!checkPasswordFields()) return;

    try {
      await userManagement.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      const {
        ERROR_EMAIL_ALREADY_USED,
        ERROR_EMAIL_NOT_VALID,
        ERROR_UNKNOWN,
        ERROR_WEAK_PASSWORD,
      } = userManagement.createUserErrorCodes;

      switch (error.code) {
        case ERROR_EMAIL_ALREADY_USED:
          setErrorEmail(t("text_email_already_used"));
          setEmail("");
          break;
        case ERROR_EMAIL_NOT_VALID:
          setErrorEmail(t("text_email_not_valid"));
          setEmail("");
          break;
        case ERROR_WEAK_PASSWORD:
          setErrorPassword1(t("text_password_too_weak"));
          setPassword("");
          setPasswordConf("");
          break;
        case ERROR_UNKNOWN:
          setErrorEmail("");
          setErrorPassword1("");
          setErrorPassword2(t("text_something_went_wrong"));
          setEmail("");
          setPassword("");
          setPasswordConf("");
          break;
      }
    }
  };

  return (
    <Background>
      <LeftContainer>
        <SignUpContainer>
          <SignUpHeader>
            <SignUpLabel>
              <Heading type={Heading.types.HEADING1}>
                {t("label_register")}
              </Heading>
            </SignUpLabel>
          </SignUpHeader>
          <OuterFormContainer>
            <StyledFormContainer onSubmit={() => {}}>
              <EmailField
                ghostText={t("label_email")}
                icon={EmailIcon}
                size={InputFieldSize.SMALL}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                errorSerious={serious}
                errorText={errorEmail}
              />
              <PasswordField
                ghostText={t("label_password")}
                icon={PasswordIcon}
                size={InputFieldSize.SMALL}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                errorSerious={serious}
                errorText={errorPassword1}
              />
              <PasswordField
                icon={PasswordIcon}
                ghostText={t("label_repeat_password")}
                size={InputFieldSize.SMALL}
                onChange={(event) => setPasswordConf(event.target.value)}
                errorSerious={serious}
                type="password"
                errorText={errorPassword2}
              />
              <SignUpButton icon={SignUpIcon} onClick={handleSubmit}>
                {t("label_register_user")}
              </SignUpButton>
            </StyledFormContainer>
          </OuterFormContainer>
        </SignUpContainer>
      </LeftContainer>
      <RightContainer>
        <CenterContainer>
          <HeadingContainer>
            <Heading type={Heading.types.HEADING1}>
              {t("label_bartstua")}
            </Heading>
            <Paragraph type={Paragraph.types.PARAGRAPH1}>
              {t("label_bartstua_quote")}
            </Paragraph>
          </HeadingContainer>
          <ActionsContainer>
            <ParagraphContainer>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_have_user")}
              </Paragraph>
            </ParagraphContainer>
            <SignInButton
              icon={SignInIcon}
              onClick={() => history.push(SIGNIN)}
            >
              {t("label_sign_in")}
            </SignInButton>
          </ActionsContainer>
        </CenterContainer>
      </RightContainer>
    </Background>
  );
};

export { Register };
