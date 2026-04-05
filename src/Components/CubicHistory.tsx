import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useEffect } from "react";

type CubicHistoryProperty = {
  currentHistory: Coefficient[];
  onSelect: (item : Coefficient) => void;
}

export default function CubicHistory

({ coefficients, update, history, saveHistory, onSelect }: UpdateCoefficient) {
    return (
      <div>
        <table className="p-[10px] rounded-[5px] mb-[50px] mr-[50px] ml-[50px] bg-white">
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
          </tr>
            {history.map((coefficients) => (
               <tr
                onClick = {() => onSelect(coefficients)}
               >
                <td>{coefficients.a}</td>
                <td>{coefficients.b}</td>
                <td>{coefficients.c}</td>
                <td>{coefficients.d}</td>
              </tr>
            ))}
        </table>
      </div>
    )
}