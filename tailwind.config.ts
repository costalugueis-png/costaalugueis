import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
        },
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          700: '#3f3f46',
          900: '#18181b',
        },
        yellow: {
          50: '#fefce8',
          500: '#eab308',
        },
      },
    },
  },
  plugins: [],
}
export default config