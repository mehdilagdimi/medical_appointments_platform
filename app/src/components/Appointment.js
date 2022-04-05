// import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Appointment = ({ apptmnt, onDelete}) => {
  return (
    <>
      <div className="apptmnt">
        <h3>
          Rendez-Vous{" "}
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(apptmnt.apptmntid)}
          />
        </h3>
        <p>Time : {apptmnt.starttime}H</p>
        <p>Date : {apptmnt.apptmntdate}</p>

        <div className="flex">
          <p>
            <Link to={`/appointments/${apptmnt.apptmntid}`}>View Details</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Appointment;
