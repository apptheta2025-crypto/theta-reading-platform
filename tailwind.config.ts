import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        /* Theta surface system - Solid and confident */
        surface: {
          low: "hsl(var(--surface-low))",
          mid: "hsl(var(--surface-mid))",
          high: "hsl(var(--surface-high))",
        },
        
        /* Theta text hierarchy */
        text: {
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
        },
        
        /* Theta brand system - Bold and distinctive */
        theta: {
          purple: "hsl(var(--theta-purple))",
          "purple-dark": "hsl(var(--theta-purple-dark))",
          "purple-light": "hsl(var(--theta-purple-light))",
          gold: "hsl(var(--theta-gold))",
        },
        
        /* Legacy brand mapping for compatibility */
        brand: {
          primary: "hsl(var(--theta-purple))",
          gold: "hsl(var(--theta-gold))",
          muted: "hsl(var(--theta-purple-dark))",
        },
        
        /* Component colors mapped to Theta system */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        /* Theta motion system - respects prefers-reduced-motion */
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(4px)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        /* Theta animations */
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "scale-in": "scale-in 0.15s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.2s ease-out",
      },
      
      /* Theta spacing system */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '128': '32rem',
      },
      
      /* Theta typography system - Pixel perfect from Figma */
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'ui-sans-serif', 'Arial', 'sans-serif'],
        'gilroy': ['Gilroy', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'ui-sans-serif', 'Arial', 'sans-serif'],
        'heading': ['Gilroy', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'ui-sans-serif', 'Arial', 'sans-serif'],
        'display': ['Gilroy', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'ui-sans-serif', 'Arial', 'sans-serif'],
        'gilroy-black': ['Gilroy', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'ui-sans-serif', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'black': '900', // For Gilroy-Black
      },
      
      /* Theta spacing system - Generous and purposeful */
      spacing: {
        '18': '4.5rem',    /* 72px */
        '22': '5.5rem',    /* 88px */
        '26': '6.5rem',    /* 104px */
        '30': '7.5rem',    /* 120px */
        '88': '22rem',     /* 352px */
        '92': '23rem',     /* 368px */
        '128': '32rem',    /* 512px */
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
