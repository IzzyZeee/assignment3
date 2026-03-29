import type{ Coefficient, UpdateCoefficient } from "./TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";

export default function CubicEquation

({ coefficients, update }: UpdateCoefficient) {
    
    const [p_val, setP] = useState<number>(0); // States include p, q, delta, x1/2/3
    const [q_val, setQ] = useState<number>(0);
    const [delta_val, setDelta] = useState<number>(0);
    const [x1, setX1] = useState<number>(0);
    const [x2, setX2] = useState<number>(0);
    const [x3, setX3] = useState<number>(0);
    const [d_val, setD] = useState<number>(0); // y-intercept

    useEffect (() => {
    
        const a = coefficients.a;
        const b = coefficients.b;
        const c = coefficients.c;
        const d = coefficients.d;
              
        const p = (3 * a * c - b * b) / (3 * a * a);
        const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
        const delta = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

        setP(Number(p.toFixed(5))); // must cast to Number. toFixed fixes it to 5 places (truncate function not needed)
        setQ(Number(q.toFixed(5)));
        setDelta(Number(delta.toFixed(5)));
        setD(Number(d.toFixed(2)));

        function cardano(a: number, b: number, p: number, q: number) { // Calculates a single root
            return Number((Math.cbrt(-q / 2 + Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) - b / (3 * a)).toFixed(2)); // Truncated to 2 decimal places like on the example
            // return Math.cbrt(-q / 2 + Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow(q / 2, 2) + Math.pow(p / 3, 3))) - b / (3 * a); // Non truncated version
        }

        if (Math.abs(delta) < 1e-15) { // Case C: Delta equals 0, but sometimes the computer can't actually get the zero so it becomes very close to zero, which we detect under the threshold (between 0 and 1e-15)

            setDelta(0); // Turns delta to zero

            if (Math.abs(p) < 1e-15 && Math.abs(q) < 1e-15) { // Case C1: Triple root when p = q = 0
            
                setX1(cardano(a, b, p, q));
                setX2(cardano(a, b, p, q));
                setX3(cardano(a, b, p, q));

            } else { // Case C2: Double root

                setX1(cardano(a, b, p, q)); // Double
                setX2(Number((Math.cbrt(q / 2) - b / (3 * a)).toFixed(2))); // Single
                // setX3(x2); // Same as x2
                setX3(Number((Math.cbrt(q / 2) - b / (3 * a)).toFixed(2)));

            }

        } else if (delta < 0) { // Case A: 3 real roots

            const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
            setX1(Number((2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a)).toFixed(2)));
            setX2(Number((2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(2)));
            setX3(Number((2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(2)));

        } else { // Case B: Delta > 0, 1 real root and 2 complex roots

            setX1(cardano(a, b, p, q));
            setX2(NaN);
            setX3(NaN);

        }
            
    }, [coefficients]); // useEffect's second [] parameter means it'll only run when [] udpates

    return (
        <div>
          <table>
            <tr>
              <td>p</td>
              <td>
                {p_val}
              </td>
            </tr>
            <tr>
              <td>q</td>
              <td>
                {q_val}
              </td>
            </tr>
            <tr>
              <td>Discriminant</td>
              <td>
                {delta_val}
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>Value</td>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr>
              <td>Root 1</td>
              <td>
                {x1}
              </td>
              <td>0</td>
            </tr>          
            <tr>
              <td>Root 2</td>
              <td>
                {x2}
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>Root 3</td>
              <td>
                {x3}
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>y-intercept</td>
              <td>0</td>
              <td>
                {d_val}
              </td>
            </tr>
          </table>
        </div>
    )












// Below is including original classes (to make putting inline CSS easier later)

    // return (
    //     <div>
    //       <table className="INSERTCSS">
    //         <tr className="table-row">
    //           <td className="half-col border-bottom">p</td>
    //           <td className="half-col border-bottom">
    //             {p}
    //           </td>
    //         </tr>
    //         <tr className="table-row">
    //           <td className="border-bottom">q</td>
    //           <td className="border-bottom">
    //             {q}
    //           </td>
    //         </tr>
    //         <tr className="table-row">
    //           <td>Discriminant</td>
    //           <td>
    //             {delta}
    //           </td>
    //         </tr>
    //       </table>
    //       <table className="font">
    //         <tr className="table-row colored-row" >
    //           <td className="half-col">Value</td>
    //           <td className="quarter-col">x</td>
    //           <td className="quarter-col">y</td>
    //         </tr>
    //         <tr className="table-row">
    //           <td className="border-bottom">Root 1</td>
    //           <td className="border-bottom">
    //             {x1}
    //           </td>
    //           <td className="border-bottom">0</td>
    //         </tr>          
    //         <tr className="table-row">
    //           <td className="border-bottom">Root 2</td>
    //           <td className="border-bottom">
    //             {x2}
    //           </td>
    //           <td className="border-bottom">0</td>
    //         </tr>
    //         <tr className="table-row">
    //           <td className="border-bottom">Root 3</td>
    //           <td className="border-bottom">
    //             {x3}
    //           </td>
    //           <td className="border-bottom">0</td>
    //         </tr>
    //         <tr className="table-row">
    //           <td>y-intercept</td>
    //           <td>0</td>
    //           <td>
    //             {d}
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    // )
}