import styled, { css } from "styled-components";
import { Theme } from "../../app.theme";

export const CenterContentProvider = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  flex-grow: 1;
  margin-top: 300px;
  flex-direction: row;
  display: flex;
  gap: ${({ theme }: { theme: Theme }) => theme.alignment.margin.LARGE};
  flex-wrap: wrap;
`;

export enum CardSizes {
  EXTRA_SMALL = "EXTRA_SMALL",
  SMALL = "SMALL",
  BIG = "BIG",
  UNSET = "UNSET",
}

export enum CardColors {
  PRIMARY = "PRIMARY",
  PRIMARY_LIGHT = "PRIMARY_LIGHT",
  DEFAULT = "DEFAULT",
}

type CardProps = {
  size?: CardSizes;
  color?: CardColors;
};

export const Card = styled.div<CardProps>`
  ${({ color }) => {
    switch (color) {
      case CardColors.PRIMARY: {
        return css`
          background-color: ${({ theme }) =>
            theme.colorPalette.primary.default};
        `;
      }
      case CardColors.PRIMARY_LIGHT: {
        return css`
          background-color: ${({ theme }: { theme: Theme }) =>
            theme.colorPalette.primary.light};
        `;
      }
      default: {
        return css`
          background-color: white;
        `;
      }
    }
  }}
  border-radius: ${({ theme }) => theme.radius.ROUND};
  padding: ${({ theme }) => theme.alignment.padding.REGULAR};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  overflow: hidden;
  flex-grow: 1;

  ${({ size }) => {
    switch (size) {
      case CardSizes.EXTRA_SMALL: {
        return css`
          flex-basis: 200px;
          max-width: 400px;
        `;
      }
      case CardSizes.SMALL: {
        return css`
          flex-basis: 400px;
        `;
      }
      case CardSizes.BIG: {
        return css`
          flex-basis: 700px;
        `;
      }
    }
  }}
`;

export const CalendarCard = styled(Card)``;
