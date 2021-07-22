import styled from "styled-components";
import { Button } from "../../components/button";
import { InputField } from "../../components/form";
import { Paragraph } from "../../components/text";
import background from "./media/sauna.jpg";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  display: block;
  background-color: white;
  width: 670px;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  display: flex;
`;

export const CenterContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`;

export const HeadingContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.alignment.margin.EXTRA_LARGE};
`;

export const ActionsContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const ParagraphText = styled(Paragraph)`
  margin-right: 100px;
`;

export const SignInButton = styled(Button)`
  background-color: #296b79;
  height: 35px;
  border-radius: 10px;
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #cfe3ea;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

export const RightContainer = styled.div`
  display: flex;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  display: flex;
  flex-grow: 1;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: 0vmax;
`;

export const SignInContainer = styled.div`
  margin: auto;
  background-color: white;
  min-width: 400px;
  min-height: 500px;
  padding: ${({ theme }) => theme.alignment.padding.LARGE};
  border-radius: 25px;
`;

export const SignInHeader = styled.div`
  min-height: 200px;
  display: flex;
`;

export const SignInLabel = styled.div`
  margin: auto;
`;

export const EmailField = styled(InputField)`
  margin-bottom: 30px;
`;

export const PasswordField = styled(InputField)`
  -webkit-text-security: disc;
  text-security: disc;
  margin-bottom: 30px;
`;

export const ForgotPasswordLink = styled.button`
  text-decoration: underline;
  background: none;
  border: none;
`;

export const SignInBottom = styled.div`
  padding-right: ${({ theme }) => theme.alignment.padding.EXTRA_EXTRA_LARGE};
  padding-top: ${({ theme }) => theme.alignment.padding.REGULAR};
  background-color: blue;
`;

export const OuterFormContainer = styled.div`
  display: flex;
`;

export const StyledFormContainer = styled.div`
  margin: auto;
`;

export const SignUpButton = styled(Button)`
  background-color: #296b79;
  height: 35px;
  border-radius: 10px;
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #cfe3ea;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

export const ParagraphContainer = styled.div`
  margin-right: 10px;
  margin-top: 10px;
`;
