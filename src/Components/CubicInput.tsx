import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";

export default function CubicInput

({ coefficients, update, history, saveHistory }: UpdateCoefficient) {

    return (
        <div
            className="w-[400px] h-[400px] rounded-[5px] pt-[20px] flex flex-wrap items-center justify-center gap-[20px] text-[20px] bg-white"
        >
            <div
                className="p-[10px] flex flex-col"
            >
                <label className="h-[40px] m-[10px]">
                    a-value:
                </label>

                <label className="h-[40px] m-[10px]">
                    b-value:
                </label>

                <label className="h-[40px] m-[10px]">
                    c-value:
                </label>

                <label className="h-[40px] m-[10px]">
                    d-value:
                </label>
            </div>
            <div
                className="p-[10px] flex flex-col"
            >
                <input
                    type="number" // Same stuff from assignment2
                    step="any"
                    value={coefficients.a} // Taken from parameter "a"
                    onChange={(e) => update({... coefficients, a: Number(e.target.value)})} // inside {} is a Ccoefficient object, where we only update "a"
                    required // Makes it mandatory
                    className="hover:bg-[rgb(202_235_229)] w-[150px] h-[40px] p-[10px] m-[10px] rounded-[20px] border-[rgb(9_69_74)] border-[1px] border-solid shadow-md text-[rgb(9_69_74_)] bg-white"
                >
                </input>

                <input
                    type="number"
                    step="any"
                    value={coefficients.b}
                    onChange={(e) => update({... coefficients, b: Number(e.target.value)})}                    
                    required 
                    className="hover:bg-[rgb(202_235_229)] w-[150px] h-[40px] p-[10px] m-[10px] rounded-[20px] border-[rgb(9_69_74)] border-[1px] border-solid shadow-md text-[rgb(9_69_74_)] bg-white" 
                >
                </input>

                <input
                    type="number" 
                    step="any"
                    value={coefficients.c}
                    onChange={(e) => update({... coefficients, c: Number(e.target.value)})}
                    required 
                    className="hover:bg-[rgb(202_235_229)] w-[150px] h-[40px] p-[10px] m-[10px] m-[10px] rounded-[20px] border-[rgb(9_69_74)] border-[1px] border-solid shadow-md text-[rgb(9_69_74_)] bg-white" 
                >
                </input>

                <input
                    type="number" 
                    step="any"
                    value={coefficients.d}
                    onChange={(e) => update({... coefficients, d: Number(e.target.value)})}
                    required 
                    className="hover:bg-[rgb(202_235_229)] w-[150px] h-[40px] p-[10px] m-[10px] rounded-[20px] border-[rgb(9_69_74)] border-[1px] border-solid shadow-md text-[rgb(9_69_74_)] bg-white" 
                >
                </input>
            </div>
            <div>
                <button // For CubicHistory
                    className="hover:bg-[rgb(39_63_61)] p-[10px] rounded-[5px] mb-[50px] mr-[50px] ml-[50px] text-white bg-[rgb(62,98,95)]"
                    onClick = {() => {saveHistory([...history, coefficients]);}} // Uses saveHistory to add the current coefficients (abcd) to history array (which is type Coefficients)
                >
                    Save that cubic!
                </button>
            </div>
        </div>
    );
}