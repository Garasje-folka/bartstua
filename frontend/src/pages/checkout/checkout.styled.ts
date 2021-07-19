import styled from "styled-components";

export const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const WidthRestriction = styled.div`
  width: 300px;
`;
