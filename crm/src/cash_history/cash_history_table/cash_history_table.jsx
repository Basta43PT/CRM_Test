import React, { useState, useEffect } from "react";
import styles from "./cash_history_table.module.css";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";

//get date object return time and date with custome formate
function getCurrentDateAndTime(date) {
  //get current date
  const newdate = new Date(date);
  const month = newdate.getMonth() + 1; // January is 0
  const year = newdate.getFullYear();
  const day = newdate.getDate();
  const formattedDate = day + "/" + month + "/" + year;
  //get currentTime
  const hour = newdate.getHours();
  const minute = newdate.getMinutes();
  const ziromin = minute <= 9 ? 0 : "";
  const zirohour = hour <= 9 ? 0 : "";

  const currentTime = `${zirohour}${hour}:${ziromin}${minute}`;
  return { formattedDate: formattedDate, currentTime: currentTime };
}

export function CashHistoryTable({ cashData }) {
  const revCashData = [...cashData].reverse();
  const dateFrmtCashData = revCashData.map((tran) => {
    const newdate = new Date(tran.date);
    const { formattedDate, currentTime } = getCurrentDateAndTime(tran.date);
    const dayOfWeek = new Date(tran.date).getDay();
    const nameDayOfWeek =
      dayOfWeek == 2 || dayOfWeek == 3
        ? "שלישי"
        : dayOfWeek == 4 || (dayOfWeek == 5 && newdate.getHours() < 8)
        ? "חמישי"
        : dayOfWeek == 5 && newdate.getHours() >= 8
        ? "שישי"
        : "אחר";

    return {
      ...tran,
      formattedDate,
      currentTime,
      nameDayOfWeek,
    };
  });
  const [settings, setSettings] = useState({});

  // create the Plotly renderers
  const PlotlyRenderers = createPlotlyRenderers(window.Plotly);

  return (
    <>
      <div className={styles.PivotTableUIWarp}>
        <PivotTableUI
          data={dateFrmtCashData}
          onChange={(s) => setSettings(s)}
          cols={["type"]}
          rows={["nameDayOfWeek", "formattedDate"]}
          aggregatorName={"Sum"}
          vals={["totalSum"]}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...settings}
          hiddenAttributes={[
            "pvtRenderers",
            "pvtAxisContainer",
            "pvtVals",
            "pvtAxisContainer",
          ]}
          hiddenFromAggregators={["id"]}
        />
      </div>
    </>
  );
}
