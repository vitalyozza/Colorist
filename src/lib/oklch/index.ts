export class OKLCHColor {
    private lightness: number;
    private chroma: number;
    private hue: number;
    private tints: OKLCHColor[] = [];
    private shades: OKLCHColor[] = [];

    constructor(oklchString: string) {
        // Парсинг строки OKLCH
        const parts = oklchString
            .replace('oklch(', '')
            .replace(')', '')
            .split(' ')
            .map(part => part.replace('%', ''));

        // Преобразование значений
        this.lightness = parseFloat(parts[0]);
        this.chroma = parseFloat(parts[1]);
        this.hue = parseFloat(parts[2]);
    }

    // Методы изменения свойств с ограничениями
    modifyLightness(delta: number): OKLCHColor {
        this.lightness = Math.max(0, Math.min(100, this.lightness + delta));
        return this;
    }

    modifyChroma(delta: number): OKLCHColor {
        this.chroma = Math.max(0, this.chroma + delta);
        return this;
    }

    modifyHue(delta: number): OKLCHColor {
        this.hue = (this.hue + delta + 360) % 360;
        return this;
    }

    // Генерация тинтов (более светлые оттенки)
    generateTints(count: number = 5, lightnessStep: number = 10): OKLCHColor[] {
        this.tints = [];
        for (let i = 1; i <= count; i++) {
            const tint = new OKLCHColor(this.toCssString());
            tint.modifyLightness(i * lightnessStep);
            this.tints.push(tint);
        }
        return this.tints;
    }

    // Генерация шейдов (более темные оттенки)
    generateShades(count: number = 5, lightnessStep: number = 10): OKLCHColor[] {
        this.shades = [];
        for (let i = 1; i <= count; i++) {
            const shade = new OKLCHColor(this.toCssString());
            shade.modifyLightness(-i * lightnessStep);
            this.shades.push(shade);
        }
        return this.shades;
    }

    // Преобразование обратно в CSS-строку
    toCssString(): string {
        return `oklch(${this.lightness.toFixed(1)}% ${this.chroma.toFixed(2)} ${this.hue.toFixed(1)})`;
    }

    // Геттеры для получения текущих значений
    getLightness(): number {
        return this.lightness;
    }

    getChroma(): number {
        return this.chroma;
    }

    getHue(): number {
        return this.hue;
    }

    // Геттеры для tints и shades
    getTints(): OKLCHColor[] {
        return this.tints;
    }

    getShades(): OKLCHColor[] {
        return this.shades;
    }
}