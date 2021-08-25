export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#296B79",
      light: "#CFE3EA",
    },
    secondary: {
      default: "#ED5F50",
    },
    contrasted: {
      default: "#505050",
      light: "#cccccc",
    },
    blended: {
      default: "#ffffff",
      dark: "#f9f9f9",
    },
  },
  radius: {
    ROUND: "10px",
    SLIGHTLY_ROUND: "5px",
  },
  alignment: {
    margin: {
      REGULAR: "15px", // DEPRECATED, use spacing instead
      LARGE: "30px", // DEPRECATED, use spacing instead
      EXTRA_LARGE: "60px", // DEPRECATED, use spacing instead
    },
    padding: {
      REGULAR: "15px", // DEPRECATED, use spacing instead
      LARGE: "30px", // DEPRECATED, use spacing instead
      EXTRA_EXTRA_LARGE: "250px", // DEPRECATED, use spacing instead
    },
  },
  spacing: {
    REGULAR: "15px",
    LARGE: "30px",
    EXTRA_LARGE: "60px",
    EXTRA_EXTRA_LARGE: "250px",
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
      PRIMARY: "#111111",
      PRIMARY_LIGHT: "#a0a0a0",
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
} as const;

export type Theme = typeof themeConfig;
