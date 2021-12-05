import "./App.css";
import React, { useState, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";

import { checkStatus, listTodos } from "./apiCalls";

import TodoList from "./TodoList";
import ErrorPage from "./errorComponents";

function App() {
  const [todoList, updateTodoList] = useState([]);
  const [updateToggle, changeUpdateToggle] = useState(true);
  const [page, switchPage] = useState(0); // update; 0: all items, 1: in progress, 2: completed
  const [renderPage, switchRenderPage] = useState(
    <ErrorPage error={"App Loading..."} />
  );

  const updatedApp = () => {
    changeUpdateToggle(updateToggle ? false : true);
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      switchRenderPage(<TodoList todoList={todoList} update={updatedApp} />);
    } else {
      switchRenderPage(
        <TodoList
          todoList={[...todoList].filter((x) => {
            return x.title.includes(e.target.value);
          })}
          update={updatedApp}
        />
      );
    }
  };

  useEffect(() => {
    console.log("changed");
    async function fetchData() {
      await checkStatus().then((r) => {
        if (r.status === 204) {
          listTodos().then((e) => {
            e.json().then((v) => {
              updateTodoList(v);
            });
          });
        } else if (r.status !== 204) {
          switchRenderPage(
            <ErrorPage error={"Server is down. Please try again later."} />
          );
        }
      });
    }
    fetchData();
  }, [updateToggle, page]);

  useEffect(() => {
    switch (page) {
      case 1:
        switchRenderPage(
          <TodoList
            todoList={[...todoList].filter((x) => {
              return x.complete === false;
            })}
            update={updatedApp}
          />
        );
        break;
      case 2:
        switchRenderPage(
          <TodoList
            todoList={[...todoList].filter((x) => {
              return x.complete === true;
            })}
            update={updatedApp}
          />
        );
        break;
      default:
        switchRenderPage(<TodoList todoList={todoList} update={updatedApp} />);
    }
  }, [todoList]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center pt-4">
        <h1>WaffleHacks To Do List</h1>
      </nav>
      <nav className="navbar navbar-expand navbar-dark bg-dark text-center justify-content-center">
        <ul className="navbar-nav mr-auto text-center">
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => updatedApp()}
            >
              <RefreshIcon />
            </span>
          </li>
          <li className={`nav-item ${page === 0 ? "active" : ""}`}>
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => switchPage(0)}
            >
              All
            </span>
          </li>
          <li className={`nav-item ${page === 1 ? "active" : ""}`}>
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => switchPage(1)}
            >
              In Progress
            </span>
          </li>
          <li className={`nav-item ${page === 2 ? "active" : ""}`}>
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => switchPage(2)}
            >
              Completed
            </span>
          </li>
        </ul>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search for a task"
            aria-label="Search"
            onChange={(e) => handleSearch(e)}
          />
        </form>
      </nav>
      {renderPage}
    </div>
  );
}

export default App;
