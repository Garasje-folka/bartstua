import styled from "styled-components";
import { Button } from "../../components/button";
import { Theme } from "../../app.theme";

export const Background = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

export const MainContainer = styled.div`
  background-color: white;
  margin: auto;
  width: 1000px;
  min-height: 300px;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  text-align: center;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  margin-top: 100px;
  margin-bottom: 40px;
  padding: 5px;
  display: block;
`;

export const CartContainer = styled.div`
  color: white;
  min-height: 270px;
  background-color: #f6f6f6;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  width: 800px;
  margin: auto;
  padding: 5px;
`;

export const HeadingContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CartButton = styled(Button)`
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radius.VERY_ROUND};
  background-color: #ed5f50;
  border: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: 150px;
  margin-top: 20px;
  height: 60px;
`;

export const BottomContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

export const TextContainer = styled.div`
  width: 200px;
  background-color: #296b79;
  color: white;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  margin-left: 90px;
  padding: 5px;
`;
