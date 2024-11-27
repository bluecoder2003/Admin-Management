import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        filterShadow: "0px 0px 48px 0px rgba(32, 49, 84, 0.20)",
      },
      colors: {
        product: {
          bg: "hsl(var(--prod-bg))",
          text1: "hsl(var(--prod-text-color1))",
          text2: "hsl(var(--prod-text-color2))",
          text3: "hsl(var(--prod-text-color3))",
          border1: "hsl(var(--prod-border-color1))",
          border2: "hsl(var(--prod-border-color2))",
          alert: "hsl(var(--prod-alert))",
          leftnav: "hsl(var(--prod-leftnav))",
        },
      },
      backgroundImage: {
        "landing-header-gradient":
          "linear-gradient(90deg, #C6BEE5, #7B89D4, #C6BEE5)",
      },
    },
  },
  plugins: [],
};

export default config;