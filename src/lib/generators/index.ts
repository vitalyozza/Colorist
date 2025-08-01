import { Color } from "$lib/interfaces";
import { OKLCHColor } from "$lib/oklch";

export const createColor = (baseOklch: string): Color => {
    /**
     * Специальная функция для быстрого заполнения 
     * объхекта Color из interfaces
     */
    const baseColor = new OKLCHColor(baseOklch);
    
    // Генерируем тинты и шейды
    const tints = baseColor.generateTints();
    const shades = baseColor.generateShades();

    // Создаем объект с тинтами
    const tintMap = tints.reduce((acc, tint, index) => {
        acc[index + 1] = { oklch: tint.toCssString() };
        return acc;
    }, {} as { [key: number]: { oklch: string } });

    // Создаем объект с шейдами
    const shadeMap = shades.reduce((acc, shade, index) => {
        acc[index + 1] = { oklch: shade.toCssString() };
        return acc;
    }, {} as { [key: number]: { oklch: string } });

    return {
        base: { 
            oklch: baseColor.toCssString() 
        },
        tints: tintMap,
        shades: shadeMap
    };
};