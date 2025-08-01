import type { PageServerLoad } from './$types';
import type { palette } from '$lib/interfaces';
import { createColor } from '$lib/generators';

const colorPalette: palette = {
    accent: createColor('oklch(53.1% 0.095525 181.2)'),
    neutral: createColor('oklch(50% 0.03 248.4)'),
    success: createColor('oklch(50% 0.16 142)'),
    danger: createColor('oklch(50% 0.16 29)'),
    attention: createColor('oklch(50.5% 0.104745 79.4)'),
    white: createColor('oklch(100% 0 0)'),
    black: createColor('oklch(0% 0 0)'),
}

export const load: PageServerLoad = async ({ params }) => {
	return {
		palette: colorPalette
	};
};