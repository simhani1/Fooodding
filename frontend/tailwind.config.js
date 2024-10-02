/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			main: "#FE8C68",
			boss: "#F27387",
			user: "#CF69A3",
			red: "#EE494C",
			yellow: "#F5CE0C",
			green: "#56E87B",
			blue: "#67C7FF",
			white: "#FFFFFF",
			black: "#000000",
			gray: {
				DEFAULT: "#848484",
				light: "#DFDFDF",
			},
		},
		extend: {
			boxShadow: {
				sm: "0 4px 15px rgba(0, 0, 0, 0.1)",
				lg: "0 10px 25px rgba(0, 0, 0, 0.1)",
			},
			spacing: {
				88: "22rem",
				96: "24rem",
				104: "26rem",
				112: "28rem",
				120: "30rem",
				160: "40rem",
				180: "45rem",
				200: "50rem",
				210: "52.5rem",
				220: "55rem",
				244: "61rem",
				300: "75rem",
			},
			screens: {
				sm: { max: "479px" },
				md: { min: "480px", max: "1023px" },
				lg: { min: "1024px", max: "1399px" },
				xl: { min: "1400px" },
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
