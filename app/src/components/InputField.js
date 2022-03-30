import { useState, useEffect } from "react";
import { FormInputs } from './InputsContext'


const InputField = ({ type, usecase, label, getContent }) => {
  const [inputValue, setInput] = useState("");

  // content = input;
  // console.log(content)
  useEffect(() => {
    getContent(inputValue);
  }, [inputValue]);

  return (
    <FormInputs.Provider value={inputValue}>
      <div className="form-control">
        <label>{label}</label>
        <input
          type={type}
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          placeholder={usecase}
        />
      </div>
    </FormInputs.Provider>
  );
};

export default InputField;
