import './App.css';
import React, { useState } from "react";
import { checkStatus, listTodos, createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "./apiCalls";
import TodoList from './TodoList';
import { EditTodo, CreateTodo } from './EditTodo';
import ErrorPage from './errorComponents';

function App() {
  const [todoList, updateTodo] = useState(["Cras justo odio", "Dapibus ac facilisis in"]);
  const [page, switchPage] = useState(0);

  let stat = 204;
  checkStatus().then(r => {console.log(r); stat = r.status;});
  console.log(stat);
  // listTodos().then(r => console.log(r));
  console.log("hello");
  
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center pt-4">
        <h1>
          WaffleHacks To do list
        </h1>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-center justify-content-center">
        <ul className="navbar-nav mr-auto text-center">
          <li className={`nav-item ${page === 0 ? "active": ""}`}>
            <span className="nav-link" onClick={() => switchPage(0)}>In Progress</span>
          </li>
          <li className={`nav-item ${page === 1 ? "active": ""}`}>
            <span className="nav-link" onClick={() => switchPage(1)}>Completed</span>
          </li>
        </ul>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search for a task" aria-label="Search" />
          <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      {stat === 204 ? <TodoList todoList={todoList} /> : <ErrorPage error={"Server is down. Please try again later."} />}
    </div>
  );
}

export default App;