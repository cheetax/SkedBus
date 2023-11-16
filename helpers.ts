export const round = (value: number, decimals: number = 2): number => Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);

export const ZeroToString = (t: number): string => t === 0 ? '' : t.toString()

