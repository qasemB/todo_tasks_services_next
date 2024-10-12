import type { Config } from "tailwindcss";

const config: Config = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff00ff",
          "secondary": "#ff00ff",
          "accent": "#00ffff",
          "neutral": "#ff00ff",
          "base-100": "#ffffff",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#00ff00",
          "error": "#ff0000",
        },
      },
    ],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        app_header_h: "70px",
        app_sidebar_w: "250px"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
