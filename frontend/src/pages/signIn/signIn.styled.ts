import styled, { css } from "styled-components";
import { Button } from "../../components/button";
import { InputField } from "../../components/form";

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

export const SignInButton = styled(Button)`
  margin-left: 5px;
`;

export const RightContainer = styled.div`
  display: flex;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  display: flex;
  flex-grow: 1;
  background-image: url(/sauna.jpg);
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

const InputFieldCommonStyle = css``;

export const EmailField = styled(InputField)``;

export const PasswordField = styled(InputField)``;

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
