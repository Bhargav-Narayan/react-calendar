import React, { useState, useEffect } from "react";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "relative",
  margin: "50px auto",
};

const Calendar = () => {
  const width = "350px";
  const style = {};

  const [dateObj, setDateObj] = useState({});
  const [today, setToday] = useState({});
  const [nextMonthCount, setNextMonthCount] = useState(0);
  const [previousMonthCount, setPreviousMonthCount] = useState(0);

  useEffect(() => {
    setDateObj(moment());
  }, []);

  const weekdays = moment.weekdays(); // Days in week
  const weekdayshort = moment.weekdaysShort(); // Shorthand for days in a week
  const months = moment.months();

  const year = () => {
    return moment(dateObj).format("Y");
  };
  const month = () => {
    return moment(dateObj).format("MMMM");
  };
  const getDaysInMonth = () => {
    return moment(dateObj).daysInMonth();
  };
  const currentDate = () => {
    return moment(dateObj).get("date");
  };
  const currentDay = () => {
    return moment(dateObj).format("D");
  };

  const firstDayOfMonth = () => {
    let firstDay = moment(dateObj).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  const lastDayOfMonth = () => {
    let lastDay = moment(dateObj).endOf("month").format("d");
    return lastDay;
  };

  const weekDays = weekdayshort.map((day) => {
    return (
      <td key={day} className="week-day">
        {day}
      </td>
    );
  });

  const lastNDayOfThePreviousMonth = (index) => {
    return moment(dateObj)
      .date((index - 1) * -1)
      .format("DD");
  };

  const getLastNdaysOfThePreviousMonth = (index) => {
    return (
      <td key={Math.random(4440)} className="empty-slot">
        {lastNDayOfThePreviousMonth(index)}
      </td>
    );
  };

  const prevMonthDates = [];
  for (let i = firstDayOfMonth(); i > 0; i--) {
    prevMonthDates.push(getLastNdaysOfThePreviousMonth(i));
  }

  const nextMonthDates = [];
  for (let i = 1; i <= 7 - (parseInt(lastDayOfMonth()) + 1); i++) {
    nextMonthDates.push(
      <td key={Math.random(4440)} className="empty-slot">
        {i}
      </td>
    );
  }

  const daysInMonth = [];
  for (let i = 1; i <= getDaysInMonth(); i++) {
    let className = i == currentDay() ? "day current-day" : "day";
    daysInMonth.push(
      <td className={className} key={i}>
        <span>{i}</span>
      </td>
    );
  }

  const totalSlots = [...prevMonthDates, ...daysInMonth, ...nextMonthDates];
  let rows = [];
  let cells = [];

  totalSlots.forEach((slot, index) => {
    if (index % 7 !== 0) {
      cells.push(slot);
    } else {
      let insertRow = cells.slice();
      rows.push(insertRow);
      cells = [];
      cells.push(slot);
    }
    if (index === totalSlots.length - 1) {
      let insertRow = cells.slice();
      rows.push(insertRow);
    }
  });

  const dateRowElements = rows.map((data, index) => {
    return <tr key={Math.random(1000)}>{data}</tr>;
  });

  const getNextMonthView = () => {
    setDateObj(moment(dateObj).add(1, "months"));
  };

  const getPreviousMonthView = () => {
    setDateObj(moment(dateObj).subtract(1, "months"));
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="lg"
          style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={(e) => getPreviousMonthView()}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="lg"
          style={{ cursor: "pointer" }}
          onClick={(e) => getNextMonthView()}
        />
        <span style={{ marginLeft: "30px" }}>
          {moment(dateObj).format("MMMM")}
        </span>
        <span style={{ marginLeft: "10px" }}>
          {moment(dateObj).format("YYYY")}
        </span>
      </div>
      <table className="calendar">
        <thead>
          <tr className="calendar-header"></tr>
        </thead>
        <tbody>
          <tr>{weekDays}</tr>
          {dateRowElements}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
