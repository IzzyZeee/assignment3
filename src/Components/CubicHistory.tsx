import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";
import { trueZero, cardano, getRoots } from "../Functions.tsx";

export default function CubicTable

({ coefficients, update }: UpdateCoefficient) {
    
    const [p_val, setP] = useState<string>(""); // States include p, q, delta, x1/2/3
    const [q_val, setQ] = useState<string>(""); // I made them String because number will chop off useless zeros
    const [delta_val, setDelta] = useState<string>("");
    const [x1, setX1] = useState<string>("");
    const [x2, setX2] = useState<string>("");
    const [x3, setX3] = useState<string>("");
    const [d_val, setD] = useState<string>(""); // y-intercept

    useEffect (() => {
    
      const a = coefficients.a;
      const b = coefficients.b;
      const c = coefficients.c;
      const d = coefficients.d;

      const p = (3 * a * c - b * b) / (3 * a * a);
      const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
      const delta = trueZero(Math.pow(q / 2, 2) + Math.pow(p / 3, 3)); // set delta to zero if it is

      if (a == 0) { // a-value cannot be zero. Does nothing until valid a-value is put
          return;
      }

      setP(trueZero(p).toFixed(5)); // It's a string. toFixed fixes it to 5 places (truncate function not needed)
      setQ(trueZero(q).toFixed(5));
      setDelta(delta.toFixed(5));
      setD(d.toFixed(2));

      const roots = getRoots(a, b, p, q, delta);
      
      setX1(String(roots[0])); // x1 always has a value

      if (Number.isNaN(roots[1])) { // If x2 is NaN x3 is also NaN (Case B)
        setX2("Complex Number");
        setX3("Complex Number");
      } else {
        setX2(String(roots[1]));
        setX3(String(roots[2]));
      }
            
    }, [coefficients]); // useEffect's second parameter [] means it'll only run when [] udpates

    return (
        <div>
        </div>
    )
}