import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}

export default App;
