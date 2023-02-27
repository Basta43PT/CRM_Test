import React, { useState, useEffect, useRef } from "react";
import styles from "./cash_pop_up_user.module.css";

export function Cash_Pop_Up_User({ onClose, users }) {
  console.log("Cash_Pop_Up_User");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [errorMSG, seterrorMSG] = useState("");
  const popupRef = useRef();

  //close window when click on the backround
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(undefined);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // check if user&pass match to user data frame!
  function secureAddCounting() {
    const isMatch = users.find((userData) => {
      return userData.password === password && userData.userName === userName;
    });
    if (isMatch !== undefined) return onClose(userName);
    else seterrorMSG("Username and/or password are incorrect");
  }

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <div className={styles.popUp} ref={popupRef}>
        <h3>Who do i have the pleasure?</h3>

        <div className={styles.inputPopUp}>
          <div className={styles.userName}>
            <label>UserName: </label>
            <input
              type="string"
              className={styles.inputUserName}
              onChange={(event) => {
                setuserName(event.target.value);
              }}
            />
          </div>

          <div className={styles.password}>
            <label>Password: </label>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className={styles.inputPassword}
              type={showPassword ? "text" : "password"}
            />

            <div
              className={styles.buttonPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                  fill="gray"
                />
              </svg>
            </div>
            <h6 className={styles.errorMSG}>{errorMSG}</h6>
          </div>
        </div>

        <div className={styles.buttons}>
          <button onClick={secureAddCounting} className={styles.buttonsSubmit}>
            Submit
          </button>
          <button
            onClick={() => onClose(undefined)}
            className={styles.buttonsClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
