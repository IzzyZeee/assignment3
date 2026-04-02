import type{ Coefficient, UpdateCoefficient } from "./TypesToUse/Types.tsx";

export function trueZero(n: number) { // To rid of floating point errors. Threshold may vary
    const threshold = 1e-15;

    if (Math.abs(n) < threshold) { // If floating point error
        return 0;
    }

    return n; // If not, return normally
}

export function cardano(a: number, b: number, p: number, q: number) { // Calculates a single root
    return String(trueZero((Math.cbrt(-q / 2 + Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) - b / (3 * a))).toFixed(2)); // Truncated to 2 decimal places like on the example
}

export function getRoots(a: number, b: number, p: number, q: number, delta: number) { // Returns the roots as numbers
    let x1;
    let x2;
    let x3;

if (delta === 0) { // Case C: Delta equals 0

        if (trueZero(p) === 0 && trueZero(q) === 0) { // Case C1: Triple root when p = q = 0
        
            x1 = cardano(a, b, p, q);
            x2 = x1;
            x3 = x1;

        } else { // Case C2: Double root

            x1 = cardano(a, b, p, q); // Double
            x2 = trueZero(Math.cbrt(q / 2) - b / (3 * a)).toFixed(2); // Single
            x3 = x2;

        }

    } else if (delta < 0) { // Case A: 3 real roots

        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
        x1 = trueZero(2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a)).toFixed(2);
        x2 = trueZero(2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(2);
        x3 = trueZero(2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(2);

    } else { // Case B: Delta > 0, 1 real root and 2 complex roots

        x1 = cardano(a, b, p, q);
        x2 = NaN;
        x3 = x2;

    }

    return [x1, x2, x3]; // Returns array
}

export function saveHistory(saves: Coefficient) {
    return 
}