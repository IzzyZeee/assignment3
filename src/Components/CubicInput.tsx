import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";

export default function CubicInput

({ coefficients, update, history, saveHistory }: UpdateCoefficient) {

    return (
        <div>
            <div style={{"display":"flex","flexWrap":"wrap","alignItems":"center","justifyContent":"center","gap":"20px","fontSize":"20px"}}>
                <label className="INSERTCSS">
                    a-value:
                </label>
                <input
                    type="number" // Same stuff from assignment2
                    step="any"
                    value={coefficients.a} // Taken from parameter "a"
                    onChange={(e) => update({... coefficients, a: Number(e.target.value)})} // inside {} is a Ccoefficient object, where we only update "a"
                    required // Makes it mandatory
                    className="INSERTCSS" // CSS goes here
                >
                </input>

                <label className="INSERTCSS">
                    b-value:
                </label>
                <input
                    type="number"
                    step="any"
                    value={coefficients.b}
                    onChange={(e) => update({... coefficients, b: Number(e.target.value)})}                    
                    required 
                    className="INSERTCSS" 
                >
                </input>

                <label className="INSERTCSS">
                    c-value:
                </label>
                <input
                    type="number" 
                    step="any"
                    value={coefficients.c}
                    onChange={(e) => update({... coefficients, c: Number(e.target.value)})}
                    required 
                    className="INSERTCSS" 
                >
                </input>

                <label className="INSERTCSS">
                    d-value:
                </label>
                <input
                    type="number" 
                    step="any"
                    value={coefficients.d}
                    onChange={(e) => update({... coefficients, d: Number(e.target.value)})}
                    required 
                    className="INSERTCSS" 
                >
                </input>
            </div>
            <div>
                <button // For CubicHistory
                    onClick = {() => {saveHistory([...history, coefficients]);}} // Uses saveHistory to add the current coefficients (abcd) to history array (which is type Coefficients)
                >
                    Save that cubic!
                </button>
            </div>
        </div>
    );
}