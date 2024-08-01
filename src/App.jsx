import { useState } from "react";
import "./App.css";
import InputTask from "./Components/InputTask/InputTask";
import ListTask from "./Components/ListTask/ListTask";

function App() {
  return (
    <>
      <div className="conatainer">
        <div className="container-fluid">
          <div className="card">
            <InputTask />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
