/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./stories/**/*.{ts,tsx,mdx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E3A8A",
                secondary: "#3B82F6",
                accent: "#2563EB",
                bgLight: "#F0F4F8",
            },
        },
    },
    plugins: [],
};
