import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        rose: {
          DEFAULT: 'hsl(var(--rose))',
          foreground: 'hsl(var(--rose-foreground))',
          50: 'hsl(var(--rose-50))',
          100: 'hsl(var(--rose-100))',
        },
        brandGold: {
          DEFAULT: 'hsl(var(--gold))',
          foreground: 'hsl(var(--gold-foreground))',
          50: 'hsl(var(--gold-50))',
          100: 'hsl(var(--gold-100))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          50: 'hsl(var(--info-50))',
          100: 'hsl(var(--info-100))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
        },
        warn: {
          DEFAULT: 'hsl(var(--warn))',
          foreground: 'hsl(var(--warn-foreground))',
          50: 'hsl(var(--warn-50))',
          100: 'hsl(var(--warn-100))',
        },
        // legacy aliases mapped to new tokens
        pink: {
          DEFAULT: 'hsl(var(--accent))',
          50: 'hsl(var(--accent-50))',
          400: 'hsl(var(--accent))',
          500: 'hsl(var(--accent))',
          600: 'hsl(var(--accent))',
          700: 'hsl(var(--primary))',
        },
        gold: {
          DEFAULT: 'hsl(var(--accent-soft))',
        },
        base: {
          white: 'hsl(var(--background))',
          gray: 'hsl(var(--muted))',
        },
        text: {
          dark: 'hsl(var(--foreground))',
          mid: 'hsl(var(--muted-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mont: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
