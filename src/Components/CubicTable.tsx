import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";
import { trueZero, cardano, getRoots } from "../Functions.tsx";

export default function CubicEquation

({ coefficients, update, history, saveHistory }: UpdateCoefficient) {
    
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
      <div className="w-[550px] mb-[50px] p-[10px] rounded-[5px] shadow-[5px 5px 20px rgba(1, 14, 19, 0.4)] bg-white">
        <table className="text-[20px]">
          <tr className="h-[40px]">
            <td className="w-[150px] border-b border-dashed border-[rgba(62, 98, 95)]">
              p
            </td>
            <td className="w-[400px] border-b border-dashed border-[rgba(62, 98, 95)]">
              {p_val}
            </td>
          </tr>
          <tr className="h-[40px]">
            <td className="border-b border-dashed border-[rgba(62, 98, 95)]">
              q
            </td>
            <td className="border-b border-dashed border-[rgba(62, 98, 95)]">
              {q_val}
            </td>
          </tr>
          <tr className="h-[40px]">
            <td>Discriminant</td>
            <td>
              {delta_val}
            </td>
          </tr>
        </table>
        <table className="text-[20px]">
          <tr className="w-[200px] h-[40px] text-white bg-[rgb(62,98,95)]">
            <td className="w-[150px]">
              Value
            </td>
            <td className="w-[200px]">
              x
            </td>
            <td className="w-[200px]">
              y
            </td>
          </tr>
          <tr className="h-[40px]">
            <td>Root 1</td>
            <td>
              {x1}
            </td>
            <td>0</td>
          </tr>          
          <tr className="h-[40px]">
            <td>Root 2</td>
            <td>
              {x2}
            </td>
            <td>0</td>
          </tr>
          <tr className="h-[40px]">
            <td>Root 3</td>
            <td>
              {x3}
            </td>
            <td>0</td>
          </tr>
          <tr className="h-[40px]">
            <td>y-intercept</td>
            <td>0</td>
            <td>
              {d_val}
            </td>
          </tr>
        </table>
      </div>
    )
}