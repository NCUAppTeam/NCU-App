import { extendTheme } from "native-base";

export const BaseTheme = extendTheme({
  colors: {
    primary: {
      600: "#476685",
      100: "#E5EBF1",
    },
    secondary: {
      600: "#ffaf42",
      100: "#7946e6",
    },
    accent1: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      600: "#ffaf42",
      800: "#ffaf42", // 正在選中
    },
    accent2: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      600: "#7946e6",
      800: "#7946e6", // 正在選中
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    // initialColorMode: 'dark',
  },
});
