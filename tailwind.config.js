/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            dropShadow: {
                glow: [
                    "0 0px 20px rgba(13, 148, 136, 0.35)",
                    "0 0px 65px rgba(13, 148, 136, 0.2)"
                ]
            }
        }
    },
    plugins: [],
}