import { Theme } from "../../app.theme";
import styled from "styled-components";
import { Button } from "../../components/button";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  gap: ${({ theme }) => theme.alignment.margin.LARGE};
`;

export const StyledImage = styled.img`
  object-fit: cover;
  width: 300px;
  height: 100%;
  border-radius: ${({ theme }: { theme: Theme }) => theme.radius.ROUND};
`;

export const SaunaSwitcher = styled.div`
  font-size: ${({ theme }: { theme: Theme }) => theme.text.size.CARD_HEADER};
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.REGULAR};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SaunaTitle = styled.span`
  flex-grow: 1;
  text-align: center;
`;

const ArrowsButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: white;
`;

export const RightArrowButton = styled(ArrowsButton)``;

export const LeftArrowButton = styled(ArrowsButton)``;

export const Content = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.text.color.INVERTED};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Information = styled.div`
  flex-grow: 1;
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.REGULAR};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ReadMoreButton = styled(Button)``;

export const InformationRow = styled.span`
  line-height: ${({ theme }: { theme: Theme }) => theme.text.lineHeight.LARGE};
  width: 100%;
`;
