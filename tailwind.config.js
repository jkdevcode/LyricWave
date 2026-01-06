import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /text-(default|primary|secondary|success|warning|danger)(-?\d{2,3})?/,
    },
    {
      pattern: /bg-(default|primary|secondary|success|warning|danger)(-?\d{2,3})?/,
    },
    {
      pattern: /border-(default|primary|secondary|success|warning|danger)(-?\d{2,3})?/,
    },
    {
      pattern: /from-(default|primary|secondary|success|warning|danger)(-?\d{2,3})?/,
    },
    {
      pattern: /to-(default|primary|secondary|success|warning|danger)(-?\d{2,3})?/,
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-border-violet":
          "linear-gradient(hsl(var(--heroui-background)), hsl(var(--heroui-background))), linear-gradient(83.87deg, #F54180, #9353D3)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
