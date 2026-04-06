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
        <table className="w-[260px] p-[10px] rounded-[5px] mb-[50px] mr-[50px] bg-[rgb(62,98,95)]">
          <tr>
            <td className="text-white font-bold pt-[10px] pb-[10px] pr-[100px] pl-[10px] border-b border-dashed border-[rgb(62_98_95)]">
              a
            </td>
            <td className="text-white font-bold pt-[10px] pb-[10px] pr-[100px] pl-[10px] border-b border-dashed border-[rgb(62_98_95)]">
              b
            </td>
            <td className="text-white font-bold pt-[10px] pb-[10px] pr-[100px] pl-[10px] border-b border-dashed border-[rgb(62_98_95)]">
              c
            </td>
            <td className="text-white font-bold pt-[10px] pb-[10px] pr-[100px] pl-[10px] border-b border-dashed border-[rgb(62_98_95)]">
              d
            </td>
          </tr>
            {history.map((coefficients) => (
               <tr className="hover:bg-[rgb(202_235_229)] p-[10px] rounded-[5px] mb-[50px] mr-[50px] ml-[50px] border-b border-dashed border-[rgb(62_98_95)] bg-white"
                onClick = {() => onSelect(coefficients)}
               >
                <td className="p-[10px]">
                  {coefficients.a}
                </td>
                <td className="p-[10px]">
                  {coefficients.b}
                </td>
                <td className="p-[10px]">
                  {coefficients.c}
                </td>
                <td className="p-[10px]">
                  {coefficients.d}
                </td>
              </tr>
            ))}
        </table>
      </div>
    )
}