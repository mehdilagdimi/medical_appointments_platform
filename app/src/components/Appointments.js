import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "./Button";
import Appointment from "./Appointment";

const Appointments = ({ showApptmnts, userRef }) => {
  const [apptmnts, setApptmnts] = useState([]);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  const onDelete = async (apptmntid) => {
    await axios
      .delete(
        `http://localhost/Medical%20appointments%20platform/api/appointments/deleteAppointment/`,
        { data: { apptmntid: apptmntid } }
      )
      .then((res) => {
        console.log(res.data.json);
        console.log(res.status);
        if (res.status == 200) {
          console.log(`Appointment with id : ${apptmntid}, has been deleted`);
        }
      });

    return true;
  };

  useEffect(() => {
    const getAppointments = async () => {
      const data = await fetchAppointments(userRef);
      if (data == "User has not made any appoinment") {
        setApptmnts([]);
        setLoading(false);
      } else {
        // console.log(Object.entries(data).length);
        // console.log(typeof(data));

        setApptmnts(data);
        // setApptmnts(Object.entries(data));
        setLoading(false);
      }
    };

    getAppointments();
  }, [onDelete]);

  const fetchAppointments = async (userRef) => {
    const data = fetch(
      `http://localhost/Medical%20appointments%20platform/api/appointments/display/${userRef}`
    )
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();

          return data;
        } else {
          throw new Error("Invalid user ref");
        }
      })
      .catch((err) => {
        console.log("Error");
        alert(err);
      });
    // console.log(data);
    // setApptmnts(Object.entries(await data))
    // setLoading(false);
    return data;
  };

  return Loading ? (
    <h3>Loading</h3>
  ) : (
    <>
      {/* {showApptmnts && fetchAppointments()} */}
      <div>Your ID : {userRef} </div>
      <hr></hr>
      <div>Your appointments :</div>
      {apptmnts.length > 0 ? (
        apptmnts.map((apptmnt) => (
          <Appointment
            key={apptmnt.apptmntid}
            apptmnt={apptmnt}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>You have not made any Appointment</p>
      )}

      {/* <p><Button link={'/'} btnName={"Return"} onClick={() => navigate(-1)} /></p> */}
      <div>
        <p>
          <Button link={"/"} btnName={"Back"} color="white" />
          <Button
            addClass="border bold"
            btnName="Make an appointment"
            color="green"
            bgColor="white"
            link="/slots"
          />
        </p>
      </div>
    </>
  );
};

export default Appointments;
