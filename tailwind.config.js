/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1736',
        brandBlue: '#1769FF',
        brightBlue: '#1687FF',
        brandCyan: '#00B8C8',
        brandGreen: '#16A878',
        riskRed: '#FF4B45',
        pageBg: '#F7FAFF',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
