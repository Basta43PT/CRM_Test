import React, { useState, useEffect } from "react";
import styles from "./cash.module.css";
import { Cash_Calculate } from "../cash_calculate";
import { Cash_Pop_Up_User } from "../cash_pop_up_user";

function getCurrentDateAndTime() {
  //get current date
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // January is 0
  const year = today.getFullYear();
  const formattedDate = date + "/" + month + "/" + year;
  //get currentTime
  const hour = today.getHours();
  const minute = today.getMinutes();
  const currentTime = `${hour}:${minute}`;

  return { formattedDate: formattedDate, currentTime: currentTime };
}

export function Cash({ cashData }) {
  const [activeButton, setActiveButton] = useState("");

  const dict = [
    { name: 200, value: 0 },
    { name: 100, value: 0 },
    { name: 50, value: 0 },
    { name: 20, value: 0 },
    { name: 10, value: 0 },
    { name: 5, value: 0 },
    { name: 2, value: 0 },
    { name: 1, value: 0 },
    { name: 0.5, value: 0 },
    { name: 0.1, value: 0 },
  ];
  const [inputs, setInputs] = useState(dict);
  const handleChange = (event, name) => {
    const next = inputs.map((line) => {
      if (name == line.name) return { ...line, value: event };
      return line;
    });
    setInputs(next);
  };

  const sum = inputs.reduce((sum, num) => sum + num.name * num.value, 0);

  //calculate the first line how much counted in the last counting
  const lastCounted = cashData[cashData.length - 1]
    ? cashData[cashData.length - 1].totalSum
    : 0;

  // handle the pop up window for the user write is name
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // add to json the last cash counting
  function AddCashCounting() {
    if (activeButton != "") {
      const time = getCurrentDateAndTime();
      //build new var to push to jason
      const newCounting = {
        id: cashData.id++,
        type: activeButton,
        employee: "yarin",
        date: time["formattedDate"],
        hour: time["currentTime"],
        totalSum: sum,
      };
      try {
        fetch(`http://localhost:3000/cash`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newCounting),
        });
        setInputs(dict);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please select either Entrance or Exit.");
      return;
    }
  }
  return (
    <div className={styles.cash}>
      {/* show the first line - last count amount */}
      <h2>Total Cash: ₪{lastCounted} counted by: </h2>

      <div className={styles.case_counting}>
        <div className={styles.cash_calculate}>
          {inputs.map((numLine) => {
            return <Cash_Calculate numLine={numLine} onChange={handleChange} />;
          })}
        </div>

        <div className={styles.total_counting}>
          <h4>Total Conuting</h4>
          <h4> ₪{sum ? sum : 0} </h4>
          <button className={styles.button} onClick={AddCashCounting}>
            Confirm
          </button>
          {showPopup && (
            <Cash_Pop_Up_User onClose={handleClosePopup}>
              <h1>Popup Content</h1>
              <button>Submit</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </Cash_Pop_Up_User>
          )}
        </div>
        {/* pick Exit\Entrance button */}
        <div className={styles.buttonE}>
          <button
            className={styles.buttonEn}
            style={{
              backgroundColor:
                activeButton === "Entrance"
                  ? "rgb(62, 192, 105)"
                  : "transparent",
            }}
            onClick={() => setActiveButton("Entrance")}
          >
            Entrance
          </button>

          <button
            className={styles.buttonEx}
            style={{
              backgroundColor:
                activeButton === "Exit" ? "rgb(62, 192, 105)" : "transparent",
            }}
            onClick={() => setActiveButton("Exit")}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
