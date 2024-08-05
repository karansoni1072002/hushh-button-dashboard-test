import type { Config } from "tailwindcss";

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
      fontFamily: {
        sans: ['var(--font-manrope)']
      },
      colors: {
        activeBG: '#F0F2F5',
        borderColour: '#3F3F46',
        fontColor: '#121417',
        buttonColor: '#1A8AE5',
        buttonColor2: '#F0F2F5',
        inputBG: '#E8EDF2',
        placeholderText: '#70707B',
        fontColor2: '#61788A',
        fontColorLight2: '#4F7596',
        fontColorDark2: '#0D141C',
        buttonFontColor1: '#3047EC',
        gradientColor1: '#A342FF',
        gradientColor2: '#E54D60',
        signipPopupBG: '#131316',
        borderGradient1: '#BABABA',
        dashBG: '#1A1D1F',
        dashDarkBG: '#111315',
        dashButton: '#499BFC',
        dashDarkFont: '#535557',
        dashGreyFont: "#B0B0B0",
        dashBorder: '#D1DBE8',
        dashDarkGreyFont: "#6E6E6E",
        dashLightBG: '#26272B',
        dashLightFont: '#A0A0AB'
      }
    },
  },
  plugins: [],
};
export default config;
