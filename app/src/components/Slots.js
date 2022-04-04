import axios from "axios";
import { useState, useEffect, useRef } from "react";

import InputField from "./InputField";
import Button from "./Button";

const Slots = () => {
  const mSlots = [9, 10, 11];
  const eSlots = [14, 15, 16, 17];
  const [reserved, setReserved] = useState([]);

  // const [apptmntState, setApptmntState] = useState("");
  const currentSlot = useRef();
  const [Clr, setClr] = useState("black");

  const [date, setDate] = useState();

  useEffect(() => {
    console.log(date);
    //when date change verify which slots are vacant
    if (date) {
      axios
        .get(
          `http://localhost/Medical%20appointments%20platform/api/appointments/getReserved/${date}`
        )
        .then((response) =>
          setReserved(response.data)
          // console.log(response.data)
        );
    }
  }, [date]);

  useEffect(() => {
    console.log("curret slot", currentSlot.current)
    console.log(reserved);
    // if (reserved) {
    //   reserved.forEach((time) => {
    //     console.log(time)
    //     if (time < 14) {
    //       mSlots.forEach((slot) => {
    //         if (slot == time) {
    //           setApptmntState("red");
    //         } else {
    //           // setApptmntState("black");
    //         }
    //       });
    //     } else {
    //       eSlots.forEach((slot) => {
    //         console.log(slot)
    //         if (slot == time) {
    //           setApptmntState("red");
              
    //         } else {
    //           // setApptmntState("black");
    //         }
    //       });
    //     }
    //   });
    // }
  }, [reserved]);

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
          <div className="flex flex-column">
            Morning
          
            {mSlots.map((slot) => {
              const isReserved = reserved.includes(slot);
              
              return (
              <>
              <div key={mSlots.indexOf(slot)} ref={currentSlot} className={`apptmnt ${isReserved && "inactiveApptmnt"}`} >
                <h3>Rendez-Vous </h3>
                <p>Date : {date}</p>
                <p>Time : {slot}H</p>
              </div>
            </>
              )
          })}

          </div>
          <div className="flex flex-column">
            Evening
            {eSlots.map((slot) => 
            {
              const isReserved = reserved.includes(slot);
              return (
              <>
                <div key={eSlots.indexOf(slot)+3} ref={currentSlot} className={`apptmnt ${isReserved && "inactiveApptmnt"}`} >
                {/* <div key={mSlots.indexOf(slot)} ref={currentSlot} className="apptmnt" style={{ color: apptmntState }}> */}
                  <h3>Rendez-Vous </h3>
                  <p>Date : {date}</p>
                  <p>Time : {slot}H</p>
                </div>
              </>
              )
          })}
          </div>
        </div>
        <div className="flex flex-end">
          <p>
            <Button link={"/"} btnName={"Back"} color="white" />
          </p>
        </div>
      </div>
    </>
  );
};

export default Slots;
