export class EngineeringPalette {
    private hue: number;
    private steps: number;
    private palette: string[];

    constructor(hue: number, steps: number = 11, minContrast: number = 1) {
        this.hue = hue;
        this.steps = steps;
        this.minContrast = minContrast;
        this.palette = this.generatePalette();
    }

    private generatePalette(): string[] {
        const palette: string[] = [];
        const middleIndex = Math.floor(this.steps / 2);

        // Генерация палитры с четким градиентом от светлого к темному
        for (let i = 0; i < this.steps; i++) {
            const lightness = this.calculateLightness(i);
            const chroma = this.calculateChroma(i);
            const oklchColor = this.createOklchColor(lightness, chroma, this.hue);
            palette.push(oklchColor);
        }

        return palette;
    }

    private createOklchColor(lightness: number, chroma: number, hue: number): string {
        return `oklch(${lightness.toFixed(2)}% ${chroma.toFixed(2)} ${hue})`;
    }

    private calculateLightness(step: number): number {
        // Линейное распределение от 95% до 10%
        const maxLightness = 95;
        const minLightness = 10;

        // Равномерное распределение от светлого к темному
        return maxLightness - (step / (this.steps - 1)) * (maxLightness - minLightness);
    }

    private calculateChroma(step: number): number {
        const minChroma = 0.16;    // Минимальная хрома
        const maxChroma = 0.27;    // Максимальная хрома
        const middleIndex = Math.floor(this.steps / 2);

        // Синусоидальное затухание
        const distanceFromMiddle = Math.abs(step - middleIndex);
        const normalizedDistance = distanceFromMiddle / middleIndex;

        // Синусоидальное сглаживание
        const chromaticness = maxChroma * (Math.cos(normalizedDistance * Math.PI) * 0.5 + 0.5);

        // Гарантированное попадание в диапазон между минимумом и максимумом
        return Math.max(minChroma, Math.min(maxChroma, chromaticness));
    }

    // Метод для получения всей палитры
    getPalette(): string[] {
        return this.palette;
    }
}