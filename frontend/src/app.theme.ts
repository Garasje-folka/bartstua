export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#296B79",
      light: "#CFE3EA",
    },
    secondary: {
      default: "#ED5F50",
    },
  },
  radius: {
    ROUND: "10px",
  },
  alignment: {
    margin: {
      REGULAR: "10px",
      LARGE: "30px",
    },
    padding: {
      SMALL: "10px",
      REGULAR: "30px",
    },
  },
  page: {
    width: "1200px",
    minHeight: "0px",
  },
  shadow: {
    REGULAR: "0px 4px 22px rgba(0, 0, 0, 0.25)",
  },
  form: {
    colors: {
      ERROR: "#ff0f0f",
      WARNING: "#ffac14",
    },
  },
  text: {
    weight: {
      THIN: "300",
      REGULAR: "400",
      BOLD: "600",
    },
    color: {
      PRIMARY: "black",
      INVERTED: "white",
    },
    size: {
      CARD_HEADER: "1.8rem",
      CARD_HIGHLIGHTED: "1.2rem",
    },
    lineHeight: {
      REGULAR: "1rem",
      LARGE: "2rem",
    },
  },
};

export type Theme = typeof themeConfig;
