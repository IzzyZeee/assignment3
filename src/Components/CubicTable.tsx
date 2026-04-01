import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";
import { trueZero, cardano, getRoots } from "../Functions.tsx";

export default function CubicEquation

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