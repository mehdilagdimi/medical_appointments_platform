import { useState, useEffect } from "react";
// import useLocalStorage from './Custom hooks/useLocalStorage'
import useSessionStorage from "./Custom hooks/useSessionStorage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Authenticate from "./components/Authenticate";
import Slots from "./components/Slots.js";
import Appointments from "./components/Appointments";
import InputField from "./components/InputField";
import Button from "./components/Button";
import GetAppointments from "./components/getAppointments";
import "./App.css";

function App() {
  // const [userAuth, setAuth] = useState({LoggedIn : false, Ref:"", hasRDV : false});
  // const [userRef, setAuth] = useLocalStorage("userRef", "");
  const [userRef, setAuth] = useSessionStorage("userRef", "");

  const [showApptmnts, setShowApptmnts] = useState(false);

  useEffect(() => {
    console.log(userRef);
    console.log(showApptmnts);
  }, [userRef, showApptmnts]);

  const logout = () => {
    setAuth("");
  }

  //add new user
  const addUser = async (user) => {
    var resClone;

    const res = await fetch(
      `http://localhost/Medical%20appointments%20platform/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then(async (response) => {
      try {
        resClone = response.clone();

        const data = await response.json();
        console.log("response data?", data);
        console.log("data?", data["userRef"]);

        if (data["msg"] == "User already exists") {
          setAuth(data["userRef"]);
        }

      } catch (error) {
        console.log("Error happened here!");
        console.error("error : ", error, resClone);
        resClone.text().then((text) => {
          console.log("received this :", text);
        });
      }
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="container">
                  {!userRef && <Authenticate onAdd={addUser} />}

                  <div className="flex flex-end">
                    {userRef && (
                      <Button
                        addClass="border bold"
                        btnName="Make an appointment"
                        color="green"
                        bgColor="white"
                        link="/slots"
                      />
                    )}
                    {userRef && (
                      <Button
                        onClick={logout}
                        addClass="border bold"
                        btnName="LOGOUT"
                        color="red"
                        bgColor="white"
                        link="/"
                      />
                    )}
                  </div>

                  {userRef && <GetAppointments userRef={userRef} />}

                  {/* {showApptmnts && <Appointments userRef={userAuth.Ref} showApptmnts={showApptmnts} />} */}
                </div>
              </>
            }
          />

          <Route
            path="/appointments"
            element={
              <>
                <div className="container">
                  {/* <Appointments userRef={userAuth.Ref} /> */}
                  <Appointments userRef={userRef} />
                </div>
              </>
            }
          />

          <Route path="/slots" element={<Slots userRef={userRef} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
