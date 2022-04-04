import { useState, useEffect } from 'react'
import useLocalStorage from './Custom hooks/useLocalStorage'

import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 


import Authenticate from "./components/Authenticate";
import Slots from "./components/Slots.js";
import Appointments from "./components/Appointments";
import InputField from './components/InputField'
import Button from './components/Button'
import GetAppointments from './components/getAppointments'
import "./App.css";

function App() {
  // const [userAuth, setAuth] = useState({LoggedIn : false, Ref:"", hasRDV : false});
  const [userRef, setAuth] = useLocalStorage("userRef", "");

  const [showApptmnts, setShowApptmnts] = useState(false);

  useEffect (() => {
    console.log(userRef);
    console.log(showApptmnts);
  }, [userRef, showApptmnts])

  
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
          setAuth(data["userRef"])
          // setAuth(() => {
          //   return {
          //     LoggedIn : true,
          //     Ref : data["userRef"],
          //     hasRDV : false
          //   }
          // })
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
    <>
      <Router>

      
      {/* {!userAuth.LoggedIn && <Authenticate onAdd={addUser} />} */}
        <Routes>
         <Route path='/' element={
           <>
           <div className="container">
            {/* {!userAuth.LoggedIn && <Authenticate onAdd={addUser} />} */}
            {!userRef && <Authenticate onAdd={addUser} />}
              <div className="flex flex-end">
                {/* {userAuth.LoggedIn && <Button addClass="border bold" btnName='Make an appointment' color='green' bgColor="white" link='/slots' />} */}
                {userRef && <Button addClass="border bold" btnName='Make an appointment' color='green' bgColor="white" link='/slots' />}
              </div>
            
            {/* {userAuth.LoggedIn && <GetAppointments userRef={userAuth.Ref} />} */}
            {userRef && <GetAppointments userRef={userRef} />}
            
            {/* {showApptmnts && <Appointments userRef={userAuth.Ref} showApptmnts={showApptmnts} />} */}
            </div>
          </>
         } />
          
          <Route path='/appointments' element={
            <>
            <div className="container">
            {/* <Appointments userRef={userAuth.Ref} /> */}
            <Appointments userRef={userRef} />
            </div>
            </>
          } />
       
          <Route path='/slots' element={<Slots />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
