import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'golos': ['Golos Text', 'sans-serif'],
				'oswald': ['Oswald', 'sans-serif'],
			},
			colors: {
				border: 'rgb(var(--border) / <alpha-value>)',
				input: 'rgb(var(--input) / <alpha-value>)',
				ring: 'rgb(var(--ring) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: '#FF6B00',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#FF1E64',
					foreground: '#ffffff'
				},
				accent: {
					DEFAULT: '#FFDC00',
					foreground: '#0F0F14'
				},
				muted: {
					DEFAULT: '#282837',
					foreground: '#A0A0B4'
				},
				card: {
					DEFAULT: '#16161E',
					foreground: '#ffffff'
				},
				popover: {
					DEFAULT: '#16161E',
					foreground: '#ffffff'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#ffffff'
				},
				dark: {
					bg: '#0F0F14',
					card: '#16161E',
					card2: '#1E1E28',
				},
				neon: {
					orange: '#FF6B00',
					pink: '#FF1E64',
					yellow: '#FFDC00',
					green: '#00FF87',
				}
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem',
				xl: '1.5rem',
				'2xl': '2rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(24px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'slide-right': {
					from: { opacity: '0', transform: 'translateX(-20px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
				'slide-right': 'slide-right 0.5s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
