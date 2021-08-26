import styled from "styled-components";
import { Theme } from "../../app.theme";
import { Button } from "../button";

export const VeriticalAlignedTextContainer = styled.span`
  text-align: left;
  min-width: 250px;
  font-size: 22px;
  min-height: 150px;
`;

export const BackgroundReservation = styled.div`
  background-color: ${({ theme }) => theme.colorPalette.primary.default};
  border-radius: ${({ theme }) => theme.radius.ROUND};
  margin: 20px;
  height: 250px;
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
  margin-left: 50px;
  display: flex;
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  margin-left: 90px;
  padding-bottom: 10px;
`;

export const DeleteButton = styled(Button)`
  margin-left: 70px;
  background-color: ${({ theme }) => theme.colorPalette.primary.default};
  border: none;
  margin-top: 70px;
  :hover {
    background-color: ${({ theme }) => theme.colorPalette.primary.default};
    color: #e5e5e5;
  }
`;
