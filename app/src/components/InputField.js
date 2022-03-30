import { useState, useEffect } from 'react'

const InputField = ({ type, usecase, label, getContent}) => {
    const [input, setInput] = useState('');
    // content = input;
    // console.log(content)
    useEffect(() => {
        getContent(input);
    }, [input])
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
