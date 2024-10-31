/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: [
        "bg-discord",
        "bg-white",
        {
			pattern: /bg-(rare)-(one|two|three|four|five|six)/,
		},
		{
			pattern: /text-(rare)-(one|two|three|four|five|six)/,
		},
    ],
    theme: {
        extend: {
            colors: {
                light: "#FFFFEB",
                apricot: {
					50: "#ffffeb",
					100: "#fdffc0",
					200: "#ffff85",
					300: "#fff73f",
					400: "#ffe80b",
					500: "#f4ce00",
					600: "#d3a000",
					700: "#a87200",
					800: "#8a5909",
					900: "#75480e",
					950: "#452603",
				},
                dark: {
					xs: "#C2D4D6",
					sm: "#B8D8BE",
					md: "#65877F",
					lg: "#59757D",
					DEFAULT: "#59757D",
				},
				bismark: {
					50: "#f4f7f7",
					100: "#e2e9eb",
					200: "#c9d6d8",
					300: "#a3b8bd",
					400: "#76929a",
					500: "#59757d",
					600: "#4e646c",
					700: "#43545b",
					800: "#3c484e",
					900: "#363f43",
					950: "#21272b",
				},
                primary: "#322947",
                secondary: "#A37067",
				info: "#DDD3CE",
                discord: "#5c6bc0",
                rare: {
                    six: "#ff7f0a",
                    five: "#ffae00",
                    four: "#dbb1db",
                    three: "#00b2f6",
                    two: "#dce537",
                    one: "#9f9f9f",
                },
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
				oxanium: ["Oxanium", "sans-serif"],
            },
            fontSize: {
                smaller: "9px",
            },
            height: {
				18: "4.5rem",
                21: "5.1rem",
                22: "5.5rem",
            },
			maxHeight: {
				18: "4.5rem",
				21: "5.1rem",
				22: "5.5rem",
			},
        },
    },
    plugins: [],
}
