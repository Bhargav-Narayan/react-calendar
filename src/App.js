import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import InputBox from "./components/input";
import Calendar from "./components/calendar";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
