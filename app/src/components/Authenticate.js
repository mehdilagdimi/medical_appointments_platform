import { useState, useContext, useEffect } from 'react'

import { FormInputs } from './InputsContext'
import InputField from './InputField'

// export const exchange = createContext(null);

const Authenticate = ({ onAdd}) => {
    // const values = [];
    // values.push(useContext(FormInputs));

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [birthDate, setbirthDate] = useState("");
    const [passw, setPassw] = useState("");
    
    // useEffect(() => {
    //   onAdd({ fName, lName, birthDate });
    // }, [])
    

    const onSubmit = (e) => {
      e.preventDefault();
      // console.log(fName);
      // console.log(lName);
      // console.log(birthDate);

        // if(!fName || !lName || !birthDate){
        //     alert("Please fill in all the fields")
        //     return;
        // }

        onAdd({ fName, lName, birthDate, passw });
    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
        <InputField label="First Name" usecase="First Name" type={"text"} getContent={(content) => setfName(content)}/>
        {/* <InputField label="First Name" usecase="First Name" type={"text"} content={(formInpt) => setInput(input => [...input, formInpt])}/> */}

        <InputField label="Last Name" usecase="Last Name" type={"text"} getContent={(content) => setlName(content)}/>
        {/* <InputField label="Last Name" usecase="Last Name" type={"text"} getContent={(formInpt) => setInput(input => [...input, formInpt])}/> */}

        <InputField label="Birth Date" usecase="Birth Date" type={"date"} getContent={(content) => setbirthDate(content)}/>

        <input className='btn btn-block' type='submit' value ='Authenticate' />
    </form>
  )
}

export default Authenticate