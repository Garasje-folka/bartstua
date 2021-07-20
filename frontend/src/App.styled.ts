import styled from "styled-components";

export const FontProvider = styled.div`
  font-family: Roboto, sans-serif;
  font-weight: ${({ theme }) => theme.text.weight.THIN};
`;

export const BackgroundProvider = styled.div`
  min-height: 100vh;
`;
