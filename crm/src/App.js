import { Page } from "./page";
import { AddNewItem } from "./AddNewItem";
import { data } from "./content";
// import { Routes, Route, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div class="topnav">
        <a class="active" href="#orders">
          Orders
        </a>
        <a href="./AddNewItem">Add New Item</a>
        <a href="#about">About</a>
      </div>
      {/* <div>
        <Route path="/" element={<Page />} />
        <Route path="./AddNewItem" element={<AddNewItem />} />
      </div> */}
      <div>
        <Page />
        {/* <AddNewItem /> */}
      </div>
    </div>
  );
}

export default App;
