import { useState, useRef } from 'react'
import './App.css'
import type{ Coefficient } from "./TypesToUse/Types.tsx";
import CubicEquation from "./Components/CubicEquation.tsx";
import CubicGraph from "./Components/CubicGraph.tsx";
import CubicHistory from "./Components/CubicHistory.tsx";
import CubicInput from "./Components/CubicInput.tsx";
import CubicTable from "./Components/CubicTable.tsx";

export default function App() {

const [input, setInput] = useState<Coefficient>({a: 1, b: 0, c: 0, d: 0}); // SSOT. It's a state of type Coefficient. Sets default values for abcd (a can't be 0)
const [history, setHistory] = useState<Coefficient[]>([]); // For saving history (array of type Coefficient)

  return (

    <div className="min-h-screen font-['verdana'] font-normal leading-[1.67] text-[rgb(9_69_74)] bg-gradient-to-t to-[rgb(62_98_95)] from-[rgb(80_152_146)]">
      <div
        className="flex flex-row justify-center pt-[80px] text-white text-[67px]"
      >
        Cubic Solver
      </div>

      <div
        className="flex flex-row justify-center pt-[100px]"
      >
        <CubicInput
          coefficients={input} // putting in parameters of CubicInput, coefficients and update
          update={setInput} // input and setInput are defined above
          history={history}
          saveHistory={setHistory}
          onSelect = {setInput}
        >
        </CubicInput>
        
        <div className="p-[10px]">
          <div className="mb-[16px]">
            <CubicEquation
              coefficients={input} // Anything with input will be instantly updated (cuz it's the same state)
              update={setInput}
              history={history}
              saveHistory={setHistory}
              onSelect = {setInput}
            >
            </CubicEquation>
          </div>

          <CubicTable
            coefficients={input}
            update={setInput}
            history={history}
            saveHistory={setHistory}
            onSelect = {setInput}
          >
          </CubicTable>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-[40px]">
        <CubicGraph
          coefficients={input}
          update={setInput}
          history={history}
          saveHistory={setHistory}
          onSelect = {setInput}
        >
        </CubicGraph>

        <div
          className="flex flex-col"
        >
          <div className="text-white text-[20px]"> History </div>
          <CubicHistory
            coefficients={input}
            update={setInput}
            history={history}
            saveHistory={setHistory}
            onSelect = {setInput} // Definition for onSelect
          >
          </CubicHistory>
        </div>
      </div>
    </div>
  )
}