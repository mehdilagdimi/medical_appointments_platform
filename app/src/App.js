import { useState, useEffect } from 'react'
import Authenticate from "./components/Authenticate";
import "./App.css";

function App() {
  const [userAuth, setAuth] = useState("LoggedOff");

  useEffect (() => {
    console.log(userAuth);
  }, [userAuth])

  const addUser = async (user) => {
    var resClone;

    const res = await fetch(`http://localhost/Medical%20appointments%20platform/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(user),
    } 
    ).then(async (response) => {
      try {
        resClone = response.clone();

        const data = await response.json()
        console.log('response data?', data)

        if(data == "User already exists"){
          console.log("test");
          setAuth("LoggedOn")
        }
      } 
      catch(error) {
        console.log('Error happened here!')
        console.error("error : ", error, resClone);
        resClone.text().then((text)=> 
          {console.log("received this :", text)}
        )
      }
    })
    // .then((response) => {response.json())
    // .then((data)=> console.log(data))
    
    // console.log(res)
  };

  return (
      <div className="container">
        <Authenticate onAdd={addUser} />
      </div>
  );
}

export default App;
