import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef } from "react";

export default function CubicInput

({ coefficients, update }: UpdateCoefficient) {
    
    return (
        <div>
            <div className="INSERTCSS">
                <label className="INSERTCSS">
                    a-value:
                </label>
                <input
                    type="number" // Same stuff from assignment2
                    step="any"
                    value={coefficients.a} // Taken from parameter "a"
                    onChange={(e) => update({... coefficients, a: Number(e.target.value)})} // inside {} is a Ccoefficient object, where we only update "a"
                    required // Makes it mandatory
                    className="INSERTCSS" // CSS goes here
                >
                </input>

                <label className="INSERTCSS">
                    b-value:
                </label>
                <input
                    type="number"
                    step="any"
                    value={coefficients.b}
                    onChange={(e) => update({... coefficients, b: Number(e.target.value)})}                    
                    required 
                    className="INSERTCSS" 
                >
                </input>

                <label className="INSERTCSS">
                    c-value:
                </label>
                <input
                    type="number" 
                    step="any"
                    value={coefficients.c}
                    onChange={(e) => update({... coefficients, c: Number(e.target.value)})}
                    required 
                    className="INSERTCSS" 
                >
                </input>

                <label className="INSERTCSS">
                    d-value:
                </label>
                <input
                    type="number" 
                    step="any"
                    value={coefficients.d}
                    onChange={(e) => update({... coefficients, d: Number(e.target.value)})}
                    required 
                    className="INSERTCSS" 
                >
                </input>
            </div>
        </div>
    );
}