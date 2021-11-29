import './App.css';
import React, { useState, useEffect } from "react";
import { checkStatus, listTodos, createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "./apiCalls";
import TodoList from './TodoList';
import TodoItem from "./TodoItem";
import { EditTodo, CreateTodo } from './EditTodo';

import ErrorPage from './errorComponents';

function App() {
  const [todoList, updateTodoList] = useState([]);
  const [page, switchPage] = useState(0); // update; 0: all items, 1: in progress, 2: completed, 3: detail, 4: edit, 5: delete
  const [initial, setInitial] = useState(false);
  const [renderPage, switchRenderPage] = useState(<ErrorPage error={"Server is down. Please try again later."} />);
  const [status, setStatus] = useState(true);

  console.log(initial);

  useEffect(() => {
    async function fetchData() {
      await checkStatus().then(r => {r.status === 204 ? setStatus(true) : setStatus(false)});
    }
    fetchData();

    if (status) {
      switch (page) {
        case 0:
          listTodos().then(e => {
            e.json().then(v => {
              updateTodoList(v);
            })
          });

          switchRenderPage(<TodoList todoList={todoList} onClick={openTodo} />);
          setInitial(false);
          break;
        case 3:
          break;
        default:
          listTodos().then(e => {
            e.json().then(v => {
              updateTodoList(v);
            })
          });

          switchRenderPage(<TodoList todoList={todoList} onClick={openTodo} />);
          setInitial(false);
          break;
      }
    } else {
      switchRenderPage(<ErrorPage error={"Server is down. Please try again later."} />);
    }
  }, [status, initial, page]);

  const openTodo = (listItem) => {
    switchPage(3);
    switchRenderPage(<TodoItem item={listItem}/>);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center pt-4">
        <h1>
          WaffleHacks To Do List
        </h1>
      </nav>
      <nav className="navbar navbar-expand navbar-dark bg-dark text-center justify-content-center">
        <ul className="navbar-nav mr-auto text-center">
          <li className={`nav-item ${page === 0 ? "active": ""}`}>
            <span className="nav-link" onClick={() => switchPage(0)}>All</span>
          </li>
          <li className={`nav-item ${page === 1 ? "active": ""}`}>
            <span className="nav-link" onClick={() => switchPage(1)}>In Progress</span>
          </li>
          <li className={`nav-item ${page === 2 ? "active": ""}`}>
            <span className="nav-link" onClick={() => switchPage(2)}>Completed</span>
          </li>
        </ul>
        {/* https://www.emgoto.com/react-search-bar/ */}
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search for a task" aria-label="Search" />
          <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      {renderPage}
    </div>
    
  );
}

export default App;