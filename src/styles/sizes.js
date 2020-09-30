export default {
	up() {},
	down(size) {
		const sizes = {
			XS: '575.98px',
			SM: '767.98px',
			MD: '991.98px',
			LG: '1199.98px',
			XL: '1600px',
		};
		return `@media (max-width: ${sizes[size]})`;
	},
};
