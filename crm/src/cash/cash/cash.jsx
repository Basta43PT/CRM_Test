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

export function Cash({ cashData, users }) {
  console.log("Cash");

  const [activeButton, setActiveButton] = useState("");
  const [IsClicked, setIsClicked] = useState(false);

  //employee is the name of the user that counting the cash
  const [employee, setemployee] = useState(undefined);
  useEffect(() => {
    AddCashCounting();
    setemployee(undefined);
  }, [employee]);
  //handel the data in input box that the user insert
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
      if (name == line.name) return { ...line, value: event > 0 ? event : 0 };
      return line;
    });
    setInputs(next);
  };
  // handel the value total case in the title
  const sum = inputs.reduce((sum, num) => sum + num.name * num.value, 0);

  //calculate the first line how much counted in the last counting
  const lastCounted = cashData[cashData.length - 1]
    ? cashData[cashData.length - 1].totalSum
    : 0;

  //calculate the first line how much counted in the last counting
  const lastCaseData = cashData[cashData.length - 1]
    ? cashData[cashData.length - 1]
    : undefined;

  // handle the pop up window for the user write is name
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    if (activeButton == "") {
      alert("Please select either Entrance or Exit.");
    } else {
      setIsClicked(true);
      setShowPopup(true);
    }
  };
  const handleClosePopup = (name) => {
    setShowPopup(false);
    setemployee(name);
    return;
  };

  //return true if the counting is the first at 5 hour ago
  //return false for overwrite the last counting
  function BoolOverwriteCounting() {
    const CurrentDate = new Date();
    const lastDate = lastCaseData.date;
    const diff = Math.floor((lastDate - CurrentDate) / 1000 / 60 / 60);
    if (activeButton == lastCaseData.type && diff < 10) return false;
    else return true;
  }

  // add to json the last cash counting
  function AddCashCounting() {
    if (employee != undefined) {
      const date = new Date();

      //build new var to push to jason
      const newCounting = {
        id: cashData.id++,
        type: activeButton,
        employee: employee,
        date: date,
        totalSum: sum,
      };
      if (BoolOverwriteCounting) {
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
      }
    }
  }
  return (
    <div className={styles.cash}>
      {/* show the first line - last count amount */}
      <h1>Total Cash: ₪{lastCounted} counted by: </h1>

      <div className={styles.case_counting}>
        <div className={styles.cash_calculate}>
          {inputs.map((numLine) => {
            return <Cash_Calculate numLine={numLine} onChange={handleChange} />;
          })}
        </div>

        <div className={styles.total_counting}>
          <h2>Total Conuting</h2>
          <h2> ₪{sum ? sum : 0} </h2>
          <button className={styles.button} onClick={handleOpenPopup}>
            Confirm
          </button>
          {showPopup && (
            <Cash_Pop_Up_User
              onClose={handleClosePopup}
              users={users}
            ></Cash_Pop_Up_User>
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
            onClick={() => {
              setActiveButton("Entrance");
              setIsClicked(true);
            }}
          >
            Entrance
          </button>

          <button
            className={styles.buttonEx}
            style={{
              backgroundColor:
                activeButton === "Exit" ? "rgb(62, 192, 105)" : "transparent",
            }}
            onClick={() => {
              setActiveButton("Exit");
              setIsClicked(true);
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
