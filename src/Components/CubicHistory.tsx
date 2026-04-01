import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useEffect } from "react";

export default function CubicTable

({ coefficients, update }: UpdateCoefficient) {
    
    const [a, setA] = useState<string>(""); 
    const [b, setB] = useState<string>(""); 
    const [c, setC] = useState<string>(""); 
    const [d, setD] = useState<string>(""); 

    useEffect (() => {

      if (coefficients.a == 0) { // a-value cannot be zero. Does nothing until valid a-value is put
          return;
        }

      setA(String(coefficients.a));
      setB(String(coefficients.b));
      setC(String(coefficients.c));
      setD(String(coefficients.d));
            
    }, [coefficients]); // useEffect's second parameter [] means it'll run EACH TIME [] udpates

    return (
      // <div>
      //     <tr>
      //       <td>{a}</td>
      //       <td>{b}</td>
      //       <td>{c}</td>
      //       <td>{d}</td>
      //     </tr>
      // </div>
      <div>
        <table>
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
          </tr>
        </table>
      </div>
    )
}