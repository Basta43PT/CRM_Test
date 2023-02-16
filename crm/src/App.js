import { Page } from "./order/page";
import { Transactions } from "./transactions/transactions";
import { Cash } from "./cash/cash";
import { Menu } from "./menu";
import React, { useState, useEffect } from "react";
import { CashHistory } from "./cash_history/cash_history";

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

function App() {
  const [data, fetchData] = useState([]);
  const [cashList, fetchcashList] = useState([]);
  const [users, fetchUsers] = useState([]);
  const [transactions, fetchTransactions] = useState([]);

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
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        fetchUsers(res);
        console.log(res, "users");
      });
    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((res) => {
        fetchTransactions(res);
        console.log(res, "transactions");
      });
  }, []);

  return (
    <Router>
      <div className="NavBar">
        <Menu activeOnlyWhenExact={true} to="/" label="Order" />
        <Menu to="/transactions" label="Transactions" />
        <Menu to="/cash" label="Cash Box" />
        <Menu to="/cashHistory" label="Cash History" />
        <Menu to="/addItem" label="Add Item" />
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={<Page data={data} transactions={transactions} />}
        />

        <Route
          exact
          path="/transactions"
          element={<Transactions transactions={transactions} />}
        />

        <Route
          exact
          path="/cash"
          element={<Cash cashData={cashList} users={users} />}
        />

        <Route
          exact
          path="/cashHistory"
          element={<CashHistory cashData={cashList} />}
        />

        <Route path="/AddItem" element={<AddNewItem />} />
      </Routes>
    </Router>
  );
}

export default App;
