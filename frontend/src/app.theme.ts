export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#0a58ca",
    },
  },
  radius: {
    ROUND: "5px",
  },
  alignment: {
    margin: {
      REGULAR: "10px",
      LARGE: "30px",
      EXTRA_LARGE: "60px",
    },
  },
  page: {
    width: "1200px",
    minHeight: "0px",
  },
  shadow: {
    REGULAR: "0px 4px 17px 0px rgba(0,0,0,0.10)",
  },
  form: {
    colors: {
      ERROR: "#ff0f0f",
      WARNING: "#ffac14",
    },
  },
};

export const Theme = typeof themeConfig;
