
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
			colors: {
				border: 'hsl(220, 13%, 91%)',
				input: 'hsl(220, 13%, 91%)',
				ring: 'hsl(220, 90%, 56%)',
				background: 'hsl(0, 0%, 100%)',
				foreground: 'hsl(220, 71%, 4%)',
				primary: {
					DEFAULT: 'hsl(220, 90%, 56%)',
					foreground: 'hsl(0, 0%, 98%)'
				},
				secondary: {
					DEFAULT: 'hsl(220, 14%, 96%)',
					foreground: 'hsl(220, 9%, 46%)'
				},
				destructive: {
					DEFAULT: 'hsl(0, 84%, 60%)',
					foreground: 'hsl(0, 0%, 98%)'
				},
				muted: {
					DEFAULT: 'hsl(220, 14%, 96%)',
					foreground: 'hsl(220, 9%, 46%)'
				},
				accent: {
					DEFAULT: 'hsl(220, 14%, 96%)',
					foreground: 'hsl(220, 9%, 46%)'
				},
				popover: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(224, 71%, 4%)'
				},
				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(224, 71%, 4%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(220, 71%, 4%)',
					primary: 'hsl(220, 90%, 56%)',
					'primary-foreground': 'hsl(0, 0%, 98%)',
					accent: 'hsl(220, 14%, 96%)',
					'accent-foreground': 'hsl(220, 9%, 46%)',
					border: 'hsl(220, 13%, 91%)',
					ring: 'hsl(220, 90%, 56%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
