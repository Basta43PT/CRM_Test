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
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cash, setCash] = useState([]);
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  function getDataLocalStore(dataName) {
    //intial inventory or get invertory from localStorage
    const intial = localStorage.getItem(dataName) ? true : false;
    const getData = localStorage.getItem(dataName)
      ? localStorage.getItem(dataName)
      : undefined;

    //in case got data from localStorage
    if (intial && getData != "undefined") {
      // Retrieve data from localStorage
      const parsedData = JSON.parse(localStorage.getItem(dataName));
      return parsedData;
    }

    //in case first intial data
    if (!intial) {
      // Serialize data into JSON string
      const serializedData = JSON.stringify(getData);
      // Store serialized data in local storage
      localStorage.setItem(dataName, serializedData);
      return undefined;
    }
  }

  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/Basta43PT/CRM_Test/main/crm/db.json"
      )
        .then((res) => res.json())
        .then((res) => {
          fetchData(res);
          console.log(res, "app:data:res");

          //inital inventory
          setInventory(
            res.product.map((item) => {
              return { id: item.id, amount: 0 };
            })
          );
          try {
            //inital inventory
            const resInventory = getDataLocalStore("inventory");
            if (resInventory != undefined) setInventory(resInventory);
            console.log(resInventory, "app:inventory");
          } catch (e) {
            console.error(e, "app:error:inventory");
          }

          try {
            //inital transactions
            const resTransactions = getDataLocalStore("transactions");
            if (resTransactions != undefined) setTransactions(resTransactions);
            console.log(transactions, "app:transactions");
          } catch (e) {
            console.error(e, "app:error:transactions");
          }

          try {
            //inital cash
            const resCash = getDataLocalStore("cash");
            if (resCash != undefined) {
              setCash(resCash);
            }
          } catch (e) {
            console.error(e, "app:error:cash");
          }

          try {
            //inital product
            const resProduct = getDataLocalStore("product");
            if (resProduct == undefined) {
              setProduct(res.product);
              const updatedSerializedProduct = JSON.stringify(res.product);
              localStorage.setItem("product", updatedSerializedProduct);
            } else setProduct(resProduct);
          } catch (e) {
            console.error(e, "app:error:product");
          }

          try {
            //inital categoryName
            const resCategoryName = getDataLocalStore("categoryName");
            if (resCategoryName == undefined) {
              const tempListCategoryName = [
                ...new Set(res.product.map((item) => item.categoryName)),
              ];
              setCategoryName(tempListCategoryName);
              const updatedSerializedCategoryName =
                JSON.stringify(tempListCategoryName);
              localStorage.setItem(
                "categoryName",
                updatedSerializedCategoryName
              );
            }
          } catch (e) {
            console.error(e, "app:error:categoryName");
          }
        });
    } catch (e) {
      console.error(e, "app:error");
    }
  }, []);

  return (
    <Router>
      <div className="NavBar">
        <Menu activeOnlyWhenExact={true} to="/" label="Order" />
        <Menu to="/transactions" label="Transactions" />
        <Menu to="/cash" label="Cash" />
        <Menu to="/cashHistory" label="Cash History" />
        <Menu to="/addItem" label="Add Item" />
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Page
              data={product}
              inventory={inventory}
              transactions={transactions}
            />
          }
        />

        <Route
          exact
          path="/transactions"
          element={<Transactions transactions={transactions} />}
        />

        <Route
          exact
          path="/cash"
          element={<Cash cashData={cash} users={data.users} />}
        />

        <Route
          exact
          path="/cashHistory"
          element={<CashHistory cashData={cash} />}
        />

        <Route
          path="/AddItem"
          element={
            <AddNewItem
              product={product}
              categoryName={categoryName}
              users={data.users}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
