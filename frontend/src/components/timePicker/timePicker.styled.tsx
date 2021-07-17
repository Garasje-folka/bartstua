import styled from "styled-components";
import { Button } from "../button";
import { Heading } from "../text";

export const OuterContainer = styled.div`
  margin: 30px auto;
  width: 800px;
  text-align: center;
`;

export const TimeContainer = styled.div`
  width: 250px;
  vertical-align: middle;
  margin: 20px auto;
  text-align: center;
`;

export const TimeButton = styled(Button)`
  display: inline-block;
`;

export const TimeText = styled(Heading)`
  display: inline-block;
`;
