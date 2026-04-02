export type Coefficient = { // Types to store the coefficients
  a: number;
  b: number;
  c: number;
  d: number;
};

export type UpdateCoefficient = { // To update stuff for onChange
  coefficients : Coefficient; // This object is of the type Coefficient (contains abcd)
  update : (value : Coefficient) => void; // This is a function defined elsewhere in the states (changes values) that has parameter "value" of type "Coefficient"
  history : Coefficient[]; // Array to store history
  saveHistory : (value: Coefficient[]) => void; // Like update, this is for updating the history but with Coefficient arrays
  onSelect: (item : Coefficient) => void;
}