import { Theme } from "../../app.theme";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  gap: ${({ theme }) => theme.alignment.margin.LARGE};
  padding: ${({ theme }: { theme: Theme }) => theme.alignment.padding.REGULAR};
  flex-wrap: wrap;
`;

export const Content = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.text.color.INVERTED};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
