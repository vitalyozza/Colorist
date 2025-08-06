import { oklch, formatHex } from 'culori';
import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';

export class OKLCHColor {
	name: string = "Unknown Color"
	lightness: number;
	chroma: number;
	hue: number;
	tints: OKLCHColor[] = [];
	shades: OKLCHColor[] = [];
	paletteLength: number;

	constructor(
		oklchString: string | { lightness: number; chroma: number; hue: number },
		paletteLength: number = 10,
		tints: boolean = false,
		shades: boolean = false
	) {

		// Поддержка двух типов входных данных
		if (typeof oklchString === 'string') {
			const parts = oklchString
				.replace('oklch(', '')
				.replace(')', '')
				.split(' ')
				.map((part) => part.replace('%', ''));

			this.lightness = parseFloat(parts[0]);
			this.chroma = parseFloat(parts[1]);
			this.hue = parseFloat(parts[2]);
		} else {
			this.lightness = oklchString.lightness;
			this.chroma = oklchString.chroma;
			this.hue = oklchString.hue;
		}

		// Разделение paletteLength поровну между tints и shades
        const halfPaletteLength = Math.floor(paletteLength / 2);
        this.paletteLength = paletteLength;

        // Генерация оттенков без рекурсивного вызова конструктора
        if (tints) {
            this.tints = this.generateTints(halfPaletteLength);
        }

        if (shades) {
            this.shades = this.generateShades(paletteLength - halfPaletteLength);
        }

	}

	// Методы изменения свойств с ограничениями
	modifyLightness(delta: number): OKLCHColor {
		this.lightness = Math.max(0, Math.min(100, this.lightness.toFixed(2) + delta)).toFixed(2);
		return this;
	}

	modifyChroma(delta: number): OKLCHColor {
		this.chroma = Math.max(0, this.chroma.toFixed(2) + delta).toFixed(2);
		return this;
	}

	modifyHue(delta: number): OKLCHColor {
		this.hue = ((this.hue.toFixed(2) + delta + 360) % 360).toFixed(2);
		return this;
	}

	generateTints(): OKLCHColor[] {
		return Array.from({ length: this.paletteLength }, (_, step) => {
			const lightness = 95 - (step / (this.paletteLength - 1)) * 85; // От 95% до 10%
			const chroma = this.calculateChroma(step, true);
			return new OKLCHColor({
				lightness,
				chroma,
				hue: this.hue
			});
		});
	}

	generateShades(): OKLCHColor[] {
		return Array.from({ length: this.paletteLength }, (_, step) => {
			const lightness = 50 - (step / (this.paletteLength - 1)) * 40; // От 50% до 10%
			const chroma = this.calculateChroma(step, false);
			return new OKLCHColor({
				lightness,
				chroma,
				hue: this.hue
			});
		});
	}

	calculateChroma(step: number, isTint: boolean): number {
		const minChroma = 0.1;
		const maxChroma = this.chroma; // Используем текущее значение хромы
		const middleIndex = Math.floor(this.paletteLength / 2);
		const normalizedDistance = Math.abs(step - middleIndex) / middleIndex;

		const chromaticness = isTint
			? maxChroma * (1 - normalizedDistance) // Затухание для tints
			: maxChroma * (Math.cos(normalizedDistance * Math.PI) * 0.5 + 0.5); // Синусоидальное для shades

		return Math.max(minChroma, Math.min(maxChroma, chromaticness));
	}

	getColorName(hex: string): string {
		const colors = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});

		const nearest = nearestColor.from(colors);
		return nearest(this.getHex()).name;
	}

	getSanitizeColorName(): string {
		return String(this.getColorName())
			.toLowerCase().replace(/[\s'"\/\\]/g, '-')
			.replace(/-+/g, '-')  // Заменяем множественные тире на одно
			.replace(/^-|-$/g, ''); // Удаляем тире в начале и конце
	}

	getHex(): string {
		const oklchColor = { 
			mode: 'oklch', 
			l: this.lightness / 100,
			c: this.chroma, 
			h: this.hue 
		};
		return formatHex(oklch(oklchColor));
	}

	getOklch(): string {
		return `oklch(${this.lightness.toFixed(1)}% ${this.chroma.toFixed(2)} ${this.hue.toFixed(1)})`;
	} 

	// Преобразование обратно в CSS-строку
	toCssString(format:string = 'oklch'): string {

		if (format == 'oklch') {
			return this.getOklch()
		} else {
			return this.getHex()
		}
	}
}

