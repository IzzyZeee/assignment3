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

    <div>
      <CubicInput
        coefficients={input} // putting in parameters of CubicInput, coefficients and update
        update={setInput} // input and setInput are defined above
        history={history}
        saveHistory={setHistory}
        onSelect = {setInput}
      >
      </CubicInput>

      <CubicEquation
        coefficients={input} // Anything with input will be instantly updated (cuz it's the same state)
        update={setInput}
        history={history}
        saveHistory={setHistory}
        onSelect = {setInput}
      >
      </CubicEquation>

      <CubicTable
        coefficients={input}
        update={setInput}
        history={history}
        saveHistory={setHistory}
        onSelect = {setInput}
      >
      </CubicTable>

      <CubicGraph
        coefficients={input}
        update={setInput}
        history={history}
        saveHistory={setHistory}
        onSelect = {setInput}
      >
      </CubicGraph>

      <CubicHistory
        coefficients={input}
        update={setInput}
        history={history}
        saveHistory={setHistory}
        onSelect = {setInput} // Definition for onSelect
      >
      </CubicHistory>
    </div>
  )
}