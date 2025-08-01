import type { PageServerLoad } from './$types';
import { OKLCHColor } from '$lib/classes/OKLCHColor';
import { EngineeringPalette } from '$lib/classes/EngeneeringPalette';

let primary = new OKLCHColor('oklch(50% 0.2 264)')
let accent = new OKLCHColor('oklch(50% 0.2 181)')
let neutral = new OKLCHColor('oklch(50% 0 0)')
let success = new OKLCHColor('oklch(50% 0.2 142)')
let danger = new OKLCHColor('oklch(50% 0.2 29)')
let attention = new OKLCHColor('oklch(50% 0.2 80)')


let pink = new OKLCHColor('oklch(50% 0.2 25)')
let purple = new OKLCHColor('oklch(50% 0.2 277)')
let magenta = new OKLCHColor('oklch(50% 0.2 354)')

const white = new OKLCHColor('oklch(100% 0 0)');
const black = new OKLCHColor('oklch(0% 0 0)');

const primaryPalette = new EngineeringPalette(primary.getHue(), 20);
const accentPalette = new EngineeringPalette(accent.getHue(), 20);
const neutralPalette = new EngineeringPalette(neutral.getHue(), 20);
const successPalette = new EngineeringPalette(success.getHue(), 20);
const dangerPalette = new EngineeringPalette(danger.getHue(), 20);
const attentionPalette = new EngineeringPalette(attention.getHue(), 20);

const pinkPalette = new EngineeringPalette(pink.getHue(), 20);
const purplePalette = new EngineeringPalette(purple.getHue(), 20);
const magentaPalette = new EngineeringPalette(magenta.getHue(), 20);

export const load: PageServerLoad = async ({ params }) => {
	return {
        purple: purplePalette.getPalette(),
		primary: primaryPalette.getPalette(),
		accent: accentPalette.getPalette(),
		neutral: neutralPalette.getPalette(),
		success: successPalette.getPalette(),
		danger: dangerPalette.getPalette(),
		attention: attentionPalette.getPalette(),
		pink: pinkPalette.getPalette(),
		magenta: magentaPalette.getPalette(),
	};
}; 