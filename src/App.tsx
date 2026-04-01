import { useState, useRef } from 'react'
import './App.css'
import type{ Coefficient } from "./TypesToUse/Types.tsx";
import CubicEquation from "./Components/CubicEquation.tsx";
import CubicGraph from "./Components/CubicGraph.tsx";
import CubicHistory from "./Components/CubicHistory.tsx";
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

      <CubicGraph
        coefficients={input}
        update={setInput}
      >
      </CubicGraph>      

      {/* <table>
        <tr>
          <td>a</td>
          <td>b</td>
          <td>c</td>
          <td>d</td>
        </tr>
        <tr onClick={ () => 
          <CubicHistory
            coefficients={input}
            update={setInput}
          >
          </CubicHistory>
        }>
          
        </tr>
      </table> */}

      <CubicHistory
        coefficients={input}
        update={setInput}
      >
        <table>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </table>
      
      <button
        onClick={() => setItems([...items, "New Item"])}
      >
        Save that cubic!
      </button>

      </CubicHistory>
    </div>

  )
}

export default App
