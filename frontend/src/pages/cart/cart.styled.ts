import styled from "styled-components";
import { Button } from "../../components/button";

export const Background = styled.div`
  background-color: blue;
  display: flex;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

export const MainContainer = styled.div`
  background-color: white;
  margin: auto;
  min-width: 800px;
  min-height: 400px;
  box-shadow: ${({ theme }) => theme.shadow.regular};
  text-align: center;
`;

export const CartContainer = styled.div`
  background-color: #296b79;
  margin: 10px;
  color: white;
`;

export const ItemContainer = styled.div``;

export const CartButton = styled(Button)``;
