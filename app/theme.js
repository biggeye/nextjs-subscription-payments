import { useColorModeValue, extendTheme, keyframes, theme as baseTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Keyframes for animations
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const animateIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shadowLoop = keyframes`
  0%, 100% { box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2); }
  25% { box-shadow: 2px 10px 2px rgba(0, 0, 0, 0.2); }
  50% { box-shadow: -3px 15px 10px rgba(0, 0, 0, 0.2); }
  75% { box-shadow: 2px 10px 100px rgba(0, 0, 0, 0.2); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.97); opacity: .7; }
`;

// Fonts configuration
const fonts = {
  heading: "Rubik, sans-serif",
  body: "Inter, sans-serif",
  mono: "Roboto Mono, monospace",
};

// Theme extension for Chakra UI
export const sciLiveTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts,
  fontSizes: {
    sm: "12px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
  colors: {
    black: "#0f1010",
    gray: {
      50: "#f9fafa",
      100: "#f1f2f2",
      200: "#e6e8e8",
      300: "#d1d4d4",
      400: "#a9aeae",
      500: "#7c8080",
      600: "#535555",
      700: "#353737",
      800: "#1f2020",
      900: "#191a1a",
    },
    cyan: {
      50: "#f8fafa",
      100: "#e4eaec",
      200: "#d8e1e4",
      300: "#cad7da",
      400: "#a2b8bf",
      500: "#90aab2",
      600: "#7b9ba4",
      700: "#5a818d",
      800: "#3e6c79",
      900: "#1f5565",
    },
    blue: {
      50: "#f5f6f8",
      100: "#d9dee5",
      200: "#bec6d2",
      300: "#a0adbd",
      400: "#8595aa",
      500: "#6d809a",
      600: "#556c89",
      700: "#375275",
      800: "#264369",
      900: "#17365f",
    },
    purple: {
      50: "#f7f6f9",
      100: "#e1dde8",
      200: "#cbc4d6",
      300: "#aca0be",
      400: "#9788ad",
      500: "#7c6998",
      600: "#6a558a",
      700: "#59427c",
      800: "#4b3272",
      900: "#3a1f64",
    },
    pink: {
      50: "#f9f7f8",
      100: "#e8dee3",
      200: "#d7c4cc",
      300: "#bfa2af",
      400: "#af8b9b",
      500: "#9b6e81",
      600: "#8d5970",
      700: "#7d425c",
      800: "#6d2b48",
      900: "#5c1333",
    },
  },
  components: {
    Button: {
      // Example component customization
      baseStyle: (props) => ({
        fontWeight: "normal",
        _hover: {
          boxShadow: mode('lg', 'dark-lg')(props),
        },
      }),
    },
    FeatureCard: {
      baseStyle: {
        padding: "20px",
        boxShadow: "xl",
        rounded: "lg",
        borderRadius: "15px",
        
        _hover: {
          bg: "gray.600",
          transform: "translateY(-5px)",
          boxShadow: "lg",
        },
        transition: "all 0.2s",
      },
    },
  },
  animations: {
    slideDown: `${slideDown} 0.5s ease-in-out`,
    fadeIn: `${fadeIn} 0.3s ease-in-out`,
    fadeOut: `${fadeOut} 0.3s ease-in-out`,
    pulse: `${pulse} 2s infinite ease-in-out`,
    animateIn: `${animateIn} 0.8s ease-in-out`,
    shadowLoop: `${shadowLoop} 10s infinite linear`
  }
  
})

