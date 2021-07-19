import styled, { css } from "styled-components";
import background from "./media/backgroundImage.png";
import { InputField } from "../../components/form";
import { Button } from "../../components/button";
import { Theme } from "../../app.theme";

export const Background = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  height: 800px;
  width: 100%;
`;

export const ContentContainer = styled.div`
  margin: auto;
  background-color: white;
  width: 900px;
  height: 490px;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

export const ContentHeader = styled.div`
  width: 900px;
  background-color: #f6f6f6;
  border-top-right-radius: ${({ theme }) => theme.radius.ROUND};
  border-top-left-radius: ${({ theme }) => theme.radius.ROUND};
  text-align: center;
  padding: 5px;
`;

export const ContentCentral = styled.div`
  height: 400px;
  display: flex;
`;

export const EmailField = styled(InputField)`
  background-color: #f6f6f6;
  width: 300px;
`;

export const FieldContainer = styled.div`
  padding: 100px;
  background-color: #f6f6f6;
  margin: 50px;
  margin-bottom: 1px;
  border: 1px solid #f6f6f6;
  border-radius: ${({ theme }) => theme.radius.ROUND};
`;

export const InfoContainer = styled.div`
  margin-right: auto;
  padding-right: 40px;
  display: flex;
`;

export const InfoBox = styled.div`
  background-color: #296b79;
  margin: auto;
  color: white;
  padding: 40px;
  margin-left: 30px;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

export const ResetButton = styled(Button)`
  background-color: #cfe3ea;
  height: 25px;
  border-radius: 10px;
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #cfe3ea;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  margin-top: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
`;
