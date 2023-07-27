/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			screens: {
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1450px",
			},
		},
		extend: {
			keyframes: {
				bounce: {
					"0%, 100%": {
						transform: "translateX(25%)",
						"animation-timing-function": "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "none",
						"animation-timing-function": "cubic-bezier(0,0,0.2,1)",
					},
				},
			},
			gridTemplateColumns: {
				repeat: "repeat(auto-fill, minmax(400px, 1fr))",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				primary: {
					light: "#EFFFFA",
					dark: "#09211C",
					border: "#d8e8e4",
					text: "hsl(154, 9%, 40%)",
					category: "#B0FFE4",
					card: "#FCFFFE",
				},
			},
			container: {
				center: true,
				padding: "1.5rem",
			},
		},
	},
	plugins: [],
};
