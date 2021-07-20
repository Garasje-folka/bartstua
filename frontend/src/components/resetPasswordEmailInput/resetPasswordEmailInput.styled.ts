import { InputField } from "../../components/form";
import { Button } from "../../components/button";
import styled, { css } from "styled-components";

export const EmailField = styled(InputField)`
  background-color: #f6f6f6;
  width: 300px;
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
