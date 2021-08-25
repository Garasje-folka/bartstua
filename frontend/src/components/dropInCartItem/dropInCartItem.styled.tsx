import styled from "styled-components";
import { Theme } from "../../app.theme";
import { Button } from "../button";

export const VeriticalAlignedTextContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

export const BackgroundReservation = styled.div`
  background-color: #296b79;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  margin: 20px;
  height: 200px;
  display: flex;
`;

export const StyledImage = styled.img`
  object-fit: cover;
  width: 200px;
  height: 90%;
  border-radius: ${({ theme }: { theme: Theme }) => theme.radius.ROUND};
  margin: 10px;
`;

export const ContentContainer = styled.div`
  margin: ${({ theme }) => theme.alignment.margin.LARGE};
  margin-left: 100px;
  display: flex;
`;

export const ButtonContainer = styled.div`
  margin-left: 100px;
  padding-bottom: 10px;
`;

export const DeleteButton = styled(Button)`
  margin-left: 70px;
  background-color: #296b79;
  border: none;
  margin-top: 50px;
`;
