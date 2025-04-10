import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/admin-pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      // default padding
      padding: "24px",
      // default breakpoints
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      maxWidth: {
        "8xl": "96rem",
        "9xl": "104rem",
        "10xl": "120rem",
      },
      fontFamily: {
        Inter: ['"Inter", sans-serif;'],
      },
      fontSize: {
        xxs: ["10px", { lineHeight: "16px" }],
        xs: ["12px", { lineHeight: "20px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        md: ["18px", { lineHeight: "26px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["24px", { lineHeight: "36px" }],
        "2xl": ["30px", { lineHeight: "36px" }],
        "3xl": ["36px", { lineHeight: "46px" }],
      },
      colors: {
        body: {
          light: "#ffffff",
          dark: "#0C0E12",
        },
        default: {
          light: "#666666",
          dark: "#B2B2B2",
        },
        primary: {
          light: "#000000",
          dark: "#ffffff",
        },
        secondary: {
          light: "#181D27",
          dark: "#1A1A1A",
        },
        tertiary: {
          light: "#344054",
          dark: "#4D4D4D",
        },
        quaternary: {
          light: "#CECFD2",
          dark: "#414651",
        },
        gray: {
          light: "#D3D6DA",
          dark: "#646464",
          pointer: "#cccccc",
          selected: "#707070",
          default: "#f5f5f5",
        },
        "dark-body-bg": "#141414",
        danger: "#B91C1C",
      },

      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("current", "&.active");
    }),
    // require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
};
export default config;
