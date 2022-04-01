import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 

import Authenticate from "./components/Authenticate";
import Slots from "./components/Slots.js";
import Appointments from "./components/Appointments";
import InputField from './components/InputField'
import Button from './components/Button'
import GetAppointment from './components/getAppointments'
import "./App.css";

function App() {
  const [userAuth, setAuth] = useState({LoggedIn : false, ref:"", hasRDV : false});

  useEffect (() => {
    console.log(userAuth);
  }, [userAuth])

  const fetchAppointments = async (userRef) => {
    const data = fetch(`http://localhost/Medical%20appointments%20platform/api/appointments/display/${userRef}`)
    .then(async (res) => {
      if(res.ok){
        const data = await res.json();
        console.log(data);
        return data;
      }
      else { throw new Error("Invalid user ref")}
    }).catch((err) => {
      console.log("Error")
      alert(err);
    })

    return data;
  }

  //add new user
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
        console.log('data?', data["userRef"])

        if(data["msg"] == "User already exists"){
          setAuth(() => {
            return {
              LoggedIn : true,
              ref : data["userRef"],
              hasRDV : false
            }
          })
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
  };

  return (
      <Router>
        <Routes>
         <Route path='/' element={
           <>
            <div className="container">
              <div className="flex">
                {userAuth.LoggedIn && <Button addClass="border bold" btnName='Make an appointment' color='green' bgColor="white" link='/appointments' />}
              </div>
            
            {!userAuth.LoggedIn && <Authenticate onAdd={addUser} />}
            {/* {userAuth.LoggedIn && <InputField label="Last Name" usecase="Last Name" type={"text"} getContent={(content) => console.log(content)} />} */}
            {userAuth.LoggedIn && <GetAppointment userRef={userAuth.ref} nGetApptmnt={fetchAppointments}  />}
            
          </div>
          </>
         } />

          <Route path='/slots' element={<Slots />} />
          <Route path='/appointments' element={<Appointments />} />
        </Routes>
      
      </Router>
  );
}

export default App;
