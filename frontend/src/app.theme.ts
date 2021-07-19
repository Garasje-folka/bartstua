export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#0a58ca",
    },
  },
  radius: {
    ROUND: "5px",
    VERY_ROUND: "100px",
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
    REGULAR: "0px 4px 17px 0px rgba(0,0,0,0.10)",
  },
  form: {
    colors: {
      ERROR: "#ff0f0f",
      WARNING: "#ffac14",
      GREYED_OUT: "#6D757D",
    },
  },
};

export const Theme = typeof themeConfig;
