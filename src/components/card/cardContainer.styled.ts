import styled from "styled-components";

export const InnerContainer = styled.div`
  max-width: ${({ theme }) => theme.page.width};
  min-height: ${({ theme }) => theme.page.minHeight};
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

export const OuterContainer = styled.div`
  display: flex;
`;
