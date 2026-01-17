import React from "react";
import "./index.css";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Dashboard from "../Pages/dashboard";
import { Route, Routes} from "react-router-dom";
import MCQTest from "../Pages/MCQTest";

function App() {
  return (
    <div className="App">
      {/* <Switch> */}
      <Routes>

        <Route path="/" element=<Login/> exact />
        <Route path="/signup" element=<Signup/> />
        <Route path="/dashboard" element=<Dashboard /> />
        <Route path="/testStart" element=<MCQTest /> />
      </Routes>
      {/* </Switch> */}
    </div>
  );
}

export default App;
