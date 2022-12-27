import { Page } from "./page";
import { Menu } from "./menu";
import React, { useState, useEffect } from "react";
import { AddNewItem } from "./AddNewItem";
import { data } from "./content";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, fetchData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((res) => {
        fetchData(res);
        console.log(res, "data");
      });
  }, []);

  return (
    // <div className="App">
    //   <div class="topnav">
    //     <a class="active" to="/">
    //       Orders
    //     </a>
    //     <a href="./AddNewItem">Add New Item</a>
    //     <a href="#about">About</a>
    //   </div>

    <Router>
      <Menu activeOnlyWhenExact={true} to="/" label="Order" />
      <Menu to="/addItem" label="AddItem" />

      <hr />

      <Routes>
        <Route exact path="/" element={<Page data={data} />} />
        <Route path="/AddItem" element={<AddNewItem />} />
      </Routes>
    </Router>

    // </div>
  );
}

export default App;
