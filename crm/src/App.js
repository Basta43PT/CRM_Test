import { Page } from "./page";
import { Cash } from "./cash";
import { Menu } from "./menu";
import React, { useState, useEffect } from "react";
import { AddNewItem } from "./AddNewItem";
import styles from "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CancelOrder } from "./cancelOrder/cancelOrder";

function App() {
  const [data, fetchData] = useState([]);
  const [cashList, fetchcashList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((res) => {
        fetchData(res);
        console.log(res, "data");
      });
    fetch("http://localhost:3000/cash")
      .then((res) => res.json())
      .then((res) => {
        fetchcashList(res);
        console.log(res, "cash");
      });
  }, []);

  return (
    <Router>
      <div className="NavBar">
        <Menu activeOnlyWhenExact={true} to="/" label="Order" />
        <Menu to="/cash" label="Cash Box" />
        <Menu to="/addItem" label="Add Item" />
      </div>

      <Routes>
        <Route exact path="/" element={<Page data={data} />} />
        <Route exact path="/cash" element={<Cash cashData={cashList} />} />
        <Route path="/AddItem" element={<AddNewItem />} />
      </Routes>
    </Router>
  );
}

export default App;
