import { useState} from 'react'



import InputField from './InputField'


const Authenticate = ({ onAdd }) => {
    const [input, setInput] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(input[0]);
        return
        if(!input[0] || !input[1] || !input[2]){
            alert("Please fill in all the fields")
            return;
        }

        onAdd({ });
    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
        {/* <InputField usecase="First Name" type={"text"} content={input[0]}/> */}
        <InputField label="First Name" usecase="First Name" type={"text"} content={(formInpt) => setInput(input => [...input, formInpt])}/>
        {/* <InputField usecase="Last Name" type={"text"} content={input[1]}/> */}
        <InputField label="Last Name" usecase="Last Name" type={"text"} content={(formInpt) => setInput(input => [...input, formInpt])}/>
        {/* <InputField usecase="Birth Date" type={"date"} content={input[2]}/> */}
        <InputField label="Birth Date" usecase="Birth Date" type={"date"} content={(formInpt) => setInput(input => [...input, formInpt])}/>

        <input className='btn btn-block' type='submit' value ='Authenticate' />
    </form>
  )
}

export default Authenticate