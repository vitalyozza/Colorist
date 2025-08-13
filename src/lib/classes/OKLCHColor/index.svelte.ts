import { oklch, formatHex8, formatHex } from 'culori';
import {v4 as uuidv4} from 'uuid';
import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';

export class OKLCHColor {
	id: string
	name: string = "Unknown Color"
	namespace: string = null
	lightness: number;
	chroma: number;
	hue: number;
	alpha: number = 1; 
	tints: OKLCHColor[] = [];
	shades: OKLCHColor[] = [];
	semitransparents: OKLCHColor[] = []
	paletteLength: number;

	constructor(
		oklchString: string | { 
			lightness: number; 
			chroma: number; 
			hue: number,
			alpha?: number
		},
		options: {
			paletteLength?: number,
            generateTints?: boolean,
            generateShades?: boolean,
            generateSemitransparent?: boolean
			namespace?: string
		} = {}
	) {

		this.id = uuidv4()
		
		const {
            paletteLength = 10,
            generateTints = false,
            generateShades = false,
            generateSemitransparent = false
        } = options;

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

			// Если указан альфа-канал
			if (parts[3]) {
				this.alpha = parseFloat(parts[3]);
			}
		} else {
			this.lightness = oklchString.lightness;
			this.chroma = oklchString.chroma;
			this.hue = oklchString.hue;
			this.alpha = oklchString.alpha ?? 1; // Значение по умолчанию
		}

        this.paletteLength = paletteLength;

        // Генерация оттенков без рекурсивного вызова конструктора
        if (generateTints) {
            this.tints = this.generateTints();
        }

        if (generateShades) {
            this.shades = this.generateShades();
        }

		if (generateSemitransparent) {
			this.semitransparents = this.generateAlpha()
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

	// Метод для изменения прозрачности
    modifyAlpha(delta: number): OKLCHColor {
        this.alpha = Math.max(0, Math.min(1, this.alpha + delta));
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
			let generatedColor = $state(
				new OKLCHColor({
					lightness,
					chroma,
					hue: this.hue
				}, {
					generateSemitransparent: true,
				})
			);
			
			return generatedColor
		});
	}

	generateShades(): OKLCHColor[] {
		return Array.from({ length: this.paletteLength }, (_, step) => {
			const lightness = 50 - (step / (this.paletteLength - 1)) * 40; // От 50% до 10%
			const chroma = this.calculateChroma(step, false);
			let generatedColor = $state(
				new OKLCHColor({
					lightness,
					chroma,
					hue: this.hue
				}, {
					generateSemitransparent: true,
				})
			);
			
			return generatedColor
		});
	}

	generateAlpha(): OKLCHColor[] {
		return Array.from({ length: this.paletteLength }, (_, step) => {
			const alpha = 10 + (step / (this.paletteLength - 1)) * 90; // От 10% до 100%
			let generatedColor = $state(
				new OKLCHColor({
					lightness: this.lightness,
					chroma: this.chroma,
					hue: this.hue,
					alpha: alpha / 100 // Преобразование процентов в десятичную дробь
				})
			)
			return generatedColor
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
		return nearest(this.getHEX()).name;
	}

	getCSSVariableName(namespace: string = this.getSanitizeColorName()): string {
		return `--${namespace}-${100-this.lightness.toFixed()}${this.getAlphaForCSSVariable()}`;
	}

	getAlphaForCSSVariable(): string {
		if (this.alpha > 0 && this.alpha < 1) {
			return `-A${this.alpha*100}`
		} else {
			return ``
		}
	}

	getSanitizeColorName(): string {
		return String(this.getColorName())
			.toLowerCase().replace(/[\s'"\/\\]/g, '-')
			.replace(/-+/g, '-')  // Заменяем множественные тире на одно
			.replace(/^-|-$/g, ''); // Удаляем тире в начале и конце
	}

	getHEX(): string {
		const oklchColor = { 
			mode: 'oklch', 
			l: this.lightness / 100,
			c: this.chroma, 
			h: this.hue,
			alpha: this.alpha
		};
		return formatHex(oklch(oklchColor));
	}

	getHEXA(): string {
		const oklchColor = { 
			mode: 'oklch', 
			l: this.lightness / 100,
			c: this.chroma, 
			h: this.hue,
			alpha: this.alpha
		};
		return formatHex8(oklch(oklchColor));
	}

	getOklch(): string {
        return `oklch(${this.lightness.toFixed(1)}% ${this.chroma.toFixed(2)} ${this.hue.toFixed(1)} / ${(this.alpha * 100).toFixed(1)}%)`;
    }

	// Преобразование обратно в CSS-строку
	toCSSValue(format:string = 'oklch'): string {

		if (format == 'oklch') {
			return this.getOklch()
		} else {
			return this.getHEXA()
		}
	}

	toCSSVariable(format:string = 'oklch', namespace?: string): string {
		return this.getCSSVariableName(namespace) + `: ` + this.toCSSValue(format) + `;`
	}

	toArrayItem(format:string = 'oklch', namespace?: string): string {
		return `'`+this.toCSSValue(format)+`', /*`+this.getCSSVariableName(namespace)+`*/`
	}
}

