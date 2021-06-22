import styled from "styled-components";
import { Button } from "../../components/button";

export const Background = styled.div`
  background-color: #04ffbb;
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
  display: flex;
`;

export const SignInButton = styled(Button)`
  margin: auto;
`;
