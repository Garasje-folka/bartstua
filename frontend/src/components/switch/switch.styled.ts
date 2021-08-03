import styled from "styled-components";
import { Theme } from "../../app.theme";

// BASED ON https://www.w3schools.com/howto/howto_css_switch.asp

export const SliderSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + ${SliderSpan} {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colorPalette.primary.default};
  }

  input:focus + ${SliderSpan} {
    box-shadow: 0 0 1px #2196f3;
  }
  input:checked + ${SliderSpan}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
