import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "./InputField";
import Button from "./Button";

const Slots = ({ userRef }) => {
  const mSlots = [9, 10, 11];
  const eSlots = [14, 15, 16, 17];
  const [reserved, setReserved] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const navigate = useNavigate();


  // const [apptmntState, setApptmntState] = useState("");
  const currentSlot = useRef();

  const [date, setDate] = useState();

  useEffect(() => {
    console.log(date);
    //when date change verify which slots are vacant
    if (date) {
      axios
        .get(
          `http://localhost/Medical%20appointments%20platform/api/appointments/getReserved/${date}`
        )
        .then(
          (response) => setReserved(response.data)
          // console.log(response.data)
        );
    }
  }, [date]);

  useEffect(() => {
    console.log("current slot", currentSlot.current);
    console.log(reserved);
  }, [reserved]);

  useEffect(() => {
    console.log(isSelected)

  }, [isSelected])

  const addApptmnt = async (date, slot) => {
    console.log(slot)
    console.log(date)

    if(!date){
      alert("choose a date!")
     
      return
    }
    setIsSelected(() => ([slot]));

    await axios
      .post(
        "http://localhost/Medical%20appointments%20platform/api/appointments/makeAppointment",
        {
          userRef: userRef,
          startTime: slot,
          apptmntDate: date,
        }
      )
      .then((response) => {
        console.log(response.data)
          setIsCreated(true);
          setTimeout(() => {
            navigate('/appointments')
          }, 500)
        // navigate('/appointments')
      });
  };

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
              const selected = isSelected.includes(slot);
              return (
                <>
                  <div
                    key={mSlots.indexOf(slot)}
                    onClick={() => addApptmnt(date, slot)}
                    ref={currentSlot}
                    // className={`apptmnt ${isReserved && "inactiveApptmnt"} `}
                    className={`apptmnt ${isReserved && "inactiveApptmnt"} ${selected && "selectedApptmnt"} `}
                  >
                    <h3>Rendez-Vous </h3>
                    <p>Date : {date}</p>
                    <p>Time : {slot}H</p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex flex-column">
            Evening
            {eSlots.map((slot) => {
              const isReserved = reserved.includes(slot);
              const selected = isSelected.includes(slot);
              return (
                <>
                  <div
                    key={eSlots.indexOf(slot) + 3}
                    onClick={() => addApptmnt(date, slot)}
                    ref={currentSlot}
                    // className={`apptmnt ${isReserved && "inactiveApptmnt"} `}
                    className={`apptmnt ${isReserved && "inactiveApptmnt"} ${selected && "selectedApptmnt"}`}
                  >
                    {/* <div key={mSlots.indexOf(slot)} ref={currentSlot} className="apptmnt" style={{ color: apptmntState }}> */}
                    <h3>Rendez-Vous </h3>
                    <p>Date : {date}</p>
                    <p>Time : {slot}H</p>
                  </div>
                </>
              );
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
