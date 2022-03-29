import { useState } from 'react'

const InputField = ({ type, content, usecase, label }) => {
    const [input, setInput] = useState();
    content = input;
  return (
    <div className="form-control">
      <label>{label}</label>
      <input
        type={type}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={usecase}
      />
    </div>
  );
};

export default InputField;
