import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";

export default function CubicEquation

({ coefficients, update, history, saveHistory }: UpdateCoefficient) {
    
    const [equation, setEquation] = useState<string>(""); // State for Equation

    useEffect (() => {
    
        const a = coefficients.a;
        const b = coefficients.b;
        const c = coefficients.c;
        const d = coefficients.d;

        if (a == 0) { // a-value cannot be zero. Does nothing until valid a-value is put
            return;
        }

        function term(coefficient: number, power: number) { // Returns terms so you can put them in an equation

            let result = "";

            if (coefficient > 0) { // Positive term
                if (power == 0) { // For x^0, or last term
                    result += "+ " + (coefficient == 1 && power != 0 ? "" : coefficient) + " ";
                } else {
                    result += "+ " + (coefficient == 1 && power != 0 ? "" : coefficient) + "x<sup>" + (power > 1 ? power + " " : " ") + "</sup>"; // Doesn't put power if it's x^1
                }
            } else if (coefficient < 0) { // Negative term
                if (power == 0) {
                    result += "- " + (Math.abs(coefficient) == 1 && power != 0 ? "" : Math.abs(coefficient)) + " ";
                } else {
                    result +=  "- " + (Math.abs(coefficient) == 1 && power != 0 ? "" : Math.abs(coefficient)) + "x<sup>" + (power > 1 ? power + " " : " ") + "</sup>";
                }
            }

            return result; // Returns nothing if the coefficient was 0
        }

        setEquation(
            (a > 0 ? term(a, 3).substring(2) : "-" + term(a, 3).substring(2)) + term(b, 2) + term(c, 1) + term(d, 0) + "= 0" // The return String
        );
        
    }, [coefficients]); // useEffect's second [] parameter means it'll only run when [] udpates

    return (
        <div>
            <label 
                className="p-[10px] rounded-[5px] mb-[50px] mr-[50px] ml-[50px] bg-[white]"
                dangerouslySetInnerHTML={{ __html: equation }} // Used to straight-up put HTML into the site, a lazy fix of sorts
            >
            </label>
        </div>
    )
}