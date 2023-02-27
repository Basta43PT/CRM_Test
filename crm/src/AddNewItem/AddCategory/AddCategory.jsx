import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import { AddPopup } from "../AddPopup";

export function AddCategory(props) {
  const [showAddPopup, setShowAddPopup] = useState(false);

  function toggleAddPopup() {
    setShowAddPopup(!showAddPopup);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (props.userSignedIn) {
      // User is signed in, so add the category
      props.addCategory(e);
    } else {
      // User is not signed in, so show the add pop-up
      toggleAddPopup();
    }
  }

  return (
    <div className={styles.container}>
      <h1>Add Category</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="">Category Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          onChange={props.handleChange}
        />

        <br />
        <button className={styles.glowOnHover} type="submit">
          Add New Category
        </button>
      </form>
      {showAddPopup && (
        <div className={styles.overlay}>
          <AddPopup
            title="Sign In Required"
            message="Please sign in to add a new category."
            closePopup={toggleAddPopup}
          />
        </div>
      )}
    </div>
  );
}
