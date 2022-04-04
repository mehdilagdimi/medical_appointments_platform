import axios from "axios"
import { useState, useEffect } from "react";

import InputField from "./InputField";
import Button from "./Button";

const Slots = ({ apptmnt }) => {
  const mSlots = [9, 10, 11];
  const eSlots = [14, 15, 16, 17];
  const [reserved, setResreved] = useState([]);

  const [apptmntState, setApptmntState] = useState("black");

  const [date, setDate] = useState();

  useEffect(() => {
    console.log(date);
    //when date change verify which slots are vacant
    axios.get(`http://localhost/Medical%20appointments%20platform/api/appointments/getResreved/${date}`)
    .then((response) => (
      setResreved(response.data)
    ));

  }, [date]);

  useEffect(() => {
    reserved.forEach((time => {
      if(time < 14) {
        mSlots.forEach(slot => {
          if(slot == time) {
            setApptmntState("red");
          }
        })
      } else {
        eSlots.forEach(slot => {
          if(slot == time) {
            setApptmntState("red");
          }
        })
      }
    }))
  }, [reserved])


  return (
    <>
      <div className="container-custom-2">
        <div className="flex">
          <InputField
            label="Select a date"
            type={"date"}
            getContent={(content) => setDate(content)}
          />
        </div>

        <div className="flex flex-evenly flex-row">
          <div className="flex flex-column"> Morning
            {mSlots.map((slot) => (
              <>
                <div className="apptmnt" style={{color: apptmntState}}>
                  <h3>Rendez-Vous </h3>
                  <p>Date : {date}</p>
                  <p>Time : {slot}H</p>
            
                </div>
              </>
            ))}
          </div>
          <div className="flex flex-column">Evening
            {eSlots.map((slot) => (
              <>
                <div className="apptmnt" style={{color: apptmntState}}>
                  <h3>Rendez-Vous  </h3>
                  <p>Date : {date}</p>
                  <p>Time : {slot}H</p>
 
                </div>
              </>
            ))}
          </div>
        </div>
        <div class="flex flex-end">
          <p>
            <Button link={"/"} btnName={"Back"} color="white" />
          </p>
        </div>
      </div>
    </>
  );
};

export default Slots;
