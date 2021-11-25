import './App.css';
import React, { useState } from "react";

function App() {
  const [todoList, updateTodo] = useState(["Cras justo odio", "Dapibus ac facilisis in"]);
  const [page, switchPage] = useState(0);
  
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center pt-4">
        <h1>
          WaffleHacks To do list
        </h1>
      </nav>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center justify-content-center">
        <ul class="navbar-nav mr-auto text-center">
          <li class={`nav-item ${page == 0 ? "active": ""}`}>
            <span class="nav-link" onClick={() => switchPage(0)}>In Progress</span>
          </li>
          <li class={`nav-item ${page == 1 ? "active": ""}`}>
            <span class="nav-link" onClick={() => switchPage(1)}>Completed</span>
          </li>
        </ul>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search for a task" aria-label="Search" />
          <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      <ul class="list-group py-3">
        {todoList.map(item => {
          return (<li class="list-group-item">{item}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
