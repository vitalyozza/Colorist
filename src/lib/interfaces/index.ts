export interface Color {
    base: {
        oklch: string;
    };
    shades?: {
        [key: number]: {
            oklch: string;
        };
    };
    tints?: {
        [key: number]: {
            oklch: string;
        };
    };
}

export interface palette {
    accent: Color,
    neutral: Color,
    success: Color,
    danger: Color,
    attention: Color
    white: Color,
    black: Color
}