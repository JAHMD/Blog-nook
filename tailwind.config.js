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
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			colors: {},
			container: {
				center: true,
				padding: "1.5rem",
			},
		},
	},
	plugins: [],
};
