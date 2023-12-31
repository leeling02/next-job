/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: [
			{
				cupcake: {
					...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
          
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
				}
			}
		]
	}
};
