import React, { useEffect } from "react";
import styles from "./AddPopup.module.css";

function AddPopup(props) {
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("clicked outside");
      const popup = document.querySelector(`.${styles.popup}`);
      if (popup && !popup.contains(event.target)) {
        props.closePopup();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props]);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupInner}>
          <h2>{props.title}</h2>
          <p>{props.message}</p>
          <form className={styles.singIn}>
            <label htmlFor="">User Name:</label>
            <input type="text" />
            <label htmlFor="">Password:</label>
            <input type="password" />
            <br />
            <button type="submit">Sing in</button>
          </form>
          <button onClick={props.closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddPopup;
