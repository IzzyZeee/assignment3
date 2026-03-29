import type{ Coefficient, UpdateCoefficient } from "./TypesToUse/Types.tsx";
import { useState, useRef } from "react";

export default function CubicGraph

({ coefficients, update }: UpdateCoefficient) {
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const a = coefficients.a;
        const b = coefficients.b;
        const c = coefficients.c;
        const d = coefficients.d;

        if (coefficients.a == 0) { // a-value cannot be zero or it's no longer a cubic.
            return; // TBD what this does
        }

        const p = (3 * a * c - b * b) / (3 * a * a);
        const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
        let delta = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

        let x1 = 0;
        let x2 = 0;
        let x3 = 0;

        function truncate(num: number, places: number) {
            const multiplied = num * Math.pow(10, places); 34
            const result = Math.trunc(multiplied) / Math.pow(10, places);
            return result;
        }

        function cardano(a: number, b: number, p: number, q: number) {
            return truncate(Math.cbrt(-q / 2 + Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) - b / (3 * a), 2); 
        }

        if (Math.abs(delta) < 1e-15) {

            delta = 0;

        if (Math.abs(p) < 1e-15 && Math.abs(q) < 1e-15) { // Case C1: Triple root when p = q = 0
            x1 = cardano(a, b, p, q);
            x2 = x1;
            x3 = x1;
        } else { // Case C2: Double root
            x1 = cardano(a, b, p, q); // Double
            x2 = truncate(Math.cbrt(q / 2) - b / (3 * a), 2); // Single
            x3 = x2;
        }

        } else if (delta < 0) { // Case A: 3 real roots
            const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
            x1 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a), 2);
            x2 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a), 2);
            x3 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a), 2);
        } else { // Case B: Delta > 0, 1 real root and 2 complex roots
            x1 = cardano(a, b, p, q);
            x2 = NaN;
            x3 = NaN;
        }
    }
    
    return (
        <div>
        </div>
    )
}