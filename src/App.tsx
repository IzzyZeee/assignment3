import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import type{ Coefficient } from "./TypesToUse/Types.tsx";
import CubicEquation from "./Components/CubicEquation.tsx";
// import CubicGraph from "./CubicGraph.tsx";
// import CubicHistory from "./CubicHistory.tsx";
import CubicInput from "./Components/CubicInput.tsx";
import CubicTable from "./Components/CubicTable.tsx";

function App() {

const [input, setInput] = useState<Coefficient>({a: 1, b: 0, c: 0, d: 0}); // SSOT. It's a state of type Coefficient. Sets default values for abcd (a can't be 0)
// const inputRef = useRef<HTMLInputElement | null>(null);

  return (

    <div>
      <CubicInput
        coefficients={input} // putting in parameters of CubicInput, coefficients and update
        update={setInput} // input and setInput are defined above
      >
      </CubicInput>

      <CubicEquation
        coefficients={input} // Anything with input will be instantly updated (cuz it's the same state)
        update={setInput}
      >
      </CubicEquation>

      <CubicTable
        coefficients={input}
        update={setInput}
      >
      </CubicTable>

      
    </div>

  )
}

export default App
