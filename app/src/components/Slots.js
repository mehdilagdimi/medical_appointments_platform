import { useState, useEffect } from "react";

import InputField from "./InputField";
import Button from "./Button";

const Slots = ({ apptmnt }) => {
  const mSlots = [9, 10, 11];
  const eSlots = [14, 15, 16, 17];

  const [date, setDate] = useState();

  useEffect(() => {
    console.log(date);
  }, [date]);

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
                <div className="apptmnt">
                  <h3>Rendez-Vous </h3>
                  <p>Date : {date}</p>
                  <p>Time : {slot}H</p>
                  {/* <p>Time : {apptmnt.starttime}H</p>
          <p>Date : {apptmnt.apptmntdate}</p> */}
                </div>
              </>
            ))}
          </div>
          <div className="flex flex-column">Evening
            {eSlots.map((slot) => (
              <>
                <div className="apptmnt">
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
