import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,sidebar-drawer.tsx,vue}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,sidebar-drawer.tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [nextui()],
    darkMode: "class",
};
