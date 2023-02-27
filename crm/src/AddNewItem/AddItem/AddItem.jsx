import React, { useState } from "react";
import styles from "./AddItem.module.css";
import { AddPopup } from "../AddPopup";

export function AddItem(props) {
  const [showAddPopup, setShowAddPopup] = useState(false);

  // const categoryNameDb = categoryNameDb;

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
      <h1>Add Item</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="">Item Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          onChange={props.handleChange}
        />
        <label htmlFor="">Item Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Item Price"
          onChange={props.handleChange}
        />
        <label htmlFor="">Item Amount:</label>
        <input
          type="text"
          name="name"
          placeholder="Item Amount"
          onChange={props.handleChange}
        />
        <label htmlFor="">Category Name:</label>
        {/* {categoryNameDb.map((category) => (
          <select name="categories" id="categoriesDrop">
            <option value="Category">{category.name}</option>
          </select>
        ))} */}

        <br />
        <button className={styles.glowOnHover} type="submit">
          Add New Item
        </button>
      </form>
      {showAddPopup && (
        <div className={styles.overlay}>
          <AddPopup
            title="Sign In Required"
            message="Please sign in to add a new Item."
            closePopup={toggleAddPopup}
          />
        </div>
      )}
    </div>
  );
}
