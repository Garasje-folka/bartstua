import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { userManagement } from "../../services";
import { RESET_PASSWORD, HOME } from "../../router/routeConstants";
import { useTranslation } from "react-i18next";
import { InputFieldSize } from "../../components/form/inputField";
import {
  Background,
  LeftContainer,
  CenterContainer,
  HeadingContainer,
  ActionsContainer,
  RightContainer,
  SignInContainer,
  SignInHeader,
  SignInLabel,
  EmailField,
  PasswordField,
  OuterFormContainer,
  StyledFormContainer,
  SignInButton,
  SignUpButton,
  ForgotPasswordLink,
  ParagraphContainer,
} from "./signIn.styled";
import { Heading, Paragraph } from "../../components/text";
import { ParagraphText } from "./signIn.styled";
import { IconType } from "../../icons";
import { REGISTER } from "../../router/routeConstants";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await userManagement.signInWithEmailAndPassword(email, password);
      history.push(HOME);
    } catch (error) {
      const { signInErrorCodes } = userManagement;

      switch (error.code) {
        case signInErrorCodes.ERROR_INVALID_EMAIL:
          setErrorMessage("Ugyldig e-post");
          setIsEmailError(true);
          setIsPasswordError(false);
          break;

        case signInErrorCodes.ERROR_USER_NOT_FOUND:
          setErrorMessage("Det finnes ingen brukere med den e-posten");
          setIsEmailError(true);
          setIsPasswordError(false);
          break;

        case signInErrorCodes.ERROR_WRONG_PASSWORD:
          setErrorMessage("Feil passord");
          setIsEmailError(false);
          setIsPasswordError(true);
          break;

        default:
          setErrorMessage("Noe gikk galt");
          setIsEmailError(true);
          setIsPasswordError(true);
          break;
      }
      setPassword("");
    }
  };

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  return (
    <Background>
      <LeftContainer>
        <CenterContainer>
          <HeadingContainer>
            <Heading type={Heading.types.HEADING1}>
              {t("label_bartstua")}
            </Heading>
            <ParagraphText type={Paragraph.types.PARAGRAPH1}>
              {t("label_bartstua_quote")}
            </ParagraphText>
          </HeadingContainer>
          <ActionsContainer>
            <ParagraphContainer>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_not_registered")}
              </Paragraph>
            </ParagraphContainer>
            <SignUpButton
              icon={IconType.SignUpIcon}
              onClick={() => history.push(REGISTER)}
            >
              {t("label_register_user")}
            </SignUpButton>
          </ActionsContainer>
        </CenterContainer>
      </LeftContainer>
      <RightContainer>
        <SignInContainer>
          <SignInHeader>
            <SignInLabel>
              <Heading type={Heading.types.HEADING1}>
                {t("label_sign_in")}
              </Heading>
            </SignInLabel>
          </SignInHeader>
          <OuterFormContainer>
            <StyledFormContainer>
              <EmailField
                ghostText="E-post"
                icon={IconType.EmailIcon}
                size={InputFieldSize.SMALL}
                onChange={handleEmailChange}
                type="email"
                errorSerious={!!errorMessage}
                errorText={isEmailError ? errorMessage : undefined}
              />
              <PasswordField
                ghostText="Passord"
                icon={IconType.PasswordIcon}
                size={InputFieldSize.SMALL}
                onChange={handlePasswordChange}
                type="password"
                errorSerious={!!errorMessage}
                errorText={isPasswordError ? errorMessage : undefined}
              />
              <ForgotPasswordLink
                onClick={() => {
                  history.push(RESET_PASSWORD);
                }}
              >
                {t("label_forgot_password")}
              </ForgotPasswordLink>
              <SignInButton icon={IconType.SignInIcon} onClick={handleSubmit}>
                {t("label_sign_in")}
              </SignInButton>
            </StyledFormContainer>
          </OuterFormContainer>
        </SignInContainer>
      </RightContainer>
    </Background>
  );
};

export { SignIn };
