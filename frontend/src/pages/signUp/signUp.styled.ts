import styled, { css } from "styled-components";
import { Button } from "../../components/button";
import { FormContainer, InputField } from "../../components/form";
import background from "./media/sauna2.jpg";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const RightContainer = styled.div`
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

export const SignInButtonsContainer = styled.div`
  margin: auto;
`;

export const SignInButton = styled(Button)`
  margin-left: 5px;
`;

export const LeftContainer = styled.div`
  display: flex;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  flex-grow: 1;
  background-image: url(${background});
  background-position: 0vmax;
`;

export const SignUpContainer = styled.div`
  margin: auto;
  background-color: white;
  min-width: 400px;
  min-height: 500px;
  padding: ${({ theme }) => theme.alignment.padding.LARGE};
  border-radius: 25px;
`;

export const SignUpHeader = styled.div`
  min-height: 200px;
  display: flex;
`;

export const SignUpLabel = styled.div`
  margin: auto;
`;

export const EmailField = styled(InputField)`
  position: relative;
`;

export const PasswordField = styled(InputField)`
  -webkit-text-security: disc;
  text-security: disc;
`;

export const IconInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledFormContainer = styled(FormContainer)`
  margin: auto;
`;

export const OuterFormContainer = styled.div`
  display: flex;
`;

export const SignUpButton = styled(Button)``;

export const SignInBottom = styled.div`
  padding-right: ${({ theme }) => theme.alignment.padding.EXTRA_EXTRA_LARGE};
  padding-top: ${({ theme }) => theme.alignment.padding.REGULAR};
`;

export const EmailIcon = styled.div``;

export const ImageContainer = styled.div`
  width: 670px;
`;
