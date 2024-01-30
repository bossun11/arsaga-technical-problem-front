import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        pageBackground: "#f6f1e6",
      },
      colors: {
        deepRed: "#BA4B4D",
        reddishBrown: "#8a1f4a",
        creamLight: "#f6f1e6",
      },
    },
  },
  daisyui: {
    themes: ["light", "valentine"],
  },
  plugins: [daisyui],
};
export default config;
