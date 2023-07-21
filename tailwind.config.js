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
					border: "#B8E0D3",
					text: "#002D1F",
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
