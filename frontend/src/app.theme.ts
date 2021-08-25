export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#783940",
      light: "#fdf1f1",
    },
    secondary: {
      default: "#EA953D",
      light: "#EECD98",
    },
  },
  radius: {
    ROUND: "10px",
  },
  alignment: {
    margin: {
      REGULAR: "10px",
      LARGE: "30px",
      EXTRA_LARGE: "60px",
    },
    padding: {
      REGULAR: "10px",
      LARGE: "30px",
      EXTRA_EXTRA_LARGE: "250px",
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
      GREYED_OUT: "#6D757D",
    },
  },
  text: {
    weight: {
      THIN: "300",
      REGULAR: "400",
      BOLD: "600",
    },
    color: {
      COLORED: "#ad1111",
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
