import {
  createTodo,
  retrieveTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "./apiCalls";
import React, { useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default function TodoList(props) {
  const [editShow, setEditShow] = useState(false);
  const [detailShow, setDetailShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    title: "",
    description: "",
    due: null,
    complete: false,
  });
  const [titleFilled, setTitleFilled] = useState(false);
  const [timeTitle, setTimeTitle] = useState("Time (UTC)");

  const handleTitle = function (e) {
    if (e.target.value === "") setTitleFilled(false);
    else setTitleFilled(true);
  };
  const handleTime = function (time) {
    const timeFormat = time < 10 ? `0${time}:00:00` : `${time}:00:00`;
    setTimeTitle(timeFormat);
  };

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDetailClose = () => setDetailShow(false);
  const handleEditClose = () => setEditShow(false);
  const handleEdit = (e) => {
    e.preventDefault();
    if (e.target.due.value === "") {
      updateTodo(
        taskDetails.id,
        e.target.title.value,
        e.target.desc.value,
        null,
        taskDetails.complete
      ).then((e) => {
        if (e.status === 400) alert("Error: your task was not created");
        else if (e.status === 404) alert("Error: that task does not exist");
      });
    } else {
      const due = `${e.target.due.value}T${
        timeTitle.length === 5 ? timeTitle : "00:00:00"
      }+00:00`;
      updateTodo(
        taskDetails.id,
        e.target.title.value,
        e.target.desc.value,
        due,
        taskDetails.complete
      ).then((e) => {
        if (e.status === 400) alert("Error: your task was not created");
        else if (e.status === 404) alert("Error: that task does not exist");
      });
    }
    setEditShow(false);
    setTimeTitle("Time (UTC)");
    props.update();
  };

  const handleDelete = (todoId) => {
    deleteTodo(todoId).then((e) => {
      if (e.status !== 204) alert("There was a problem deleting your task");
    });
    setDeleteShow(false);
    props.update();
  };

  const createNew = function (e) {
    e.preventDefault();
    if (e.target.due.value === "") {
      createTodo(e.target.title.value, e.target.desc.value).then((e) => {
        if (e.status === 400) alert("Error: your task was not created");
      });
    } else {
      const due = `${e.target.due.value}T${
        timeTitle.length === 5 ? timeTitle : "00:00:00"
      }+00:00`;
      createTodo(e.target.title.value, e.target.desc.value, due).then((e) => {
        if (e.status === 400) alert("Error: your task was not created");
      });
    }
    e.target.title.value = "";
    e.target.desc.value = "";
    e.target.due.value = "";
    setTitleFilled(false);
    setTimeTitle("Time (UTC)");
    props.update();
  };

  const openDetailView = function (e) {
    retrieveTodo(e)
      .then((v) => {
        v.json().then((item) => {
          setTaskDetails({
            title: item.title,
            description: item.description,
            due: item.due,
            complete: item.complete,
          });
        });
        setDetailShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEditView = function (e) {
    retrieveTodo(e)
      .then((v) => {
        v.json().then((item) => {
          setTaskDetails({
            id: e,
            title: item.title,
            description: item.description,
            due: item.due,
            complete: item.complete,
          });
        });
        setEditShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <form
        className="form-inline px-5 py-3 justify-content-around row"
        onSubmit={(e) => createNew(e)}
      >
        <h3>Create New Task</h3>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Title (required)"
          name="title"
          onChange={(e) => handleTitle(e)}
        />
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Description"
          name="desc"
        />
        <span className="align-middle row">
          <span className="pt-1">Date Due:</span>
          <input
            className="form-control mr-sm-2 ml-2"
            type="date"
            name="due"
            id="due"
          />
          <DropdownButton
            id="time-dropdown"
            variant="secondary"
            title={timeTitle}
          >
            <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
              <Dropdown.Item onClick={() => setTimeTitle("Time (UTC)")}>
                - Select -
              </Dropdown.Item>
              {[...Array(24)].map((e, i) => {
                if (i < 10)
                  return (
                    <Dropdown.Item key={i} onClick={() => handleTime(i)}>
                      0{i}:00:00
                    </Dropdown.Item>
                  );
                else
                  return (
                    <Dropdown.Item key={i} onClick={() => handleTime(i)}>
                      {i}:00:00
                    </Dropdown.Item>
                  );
              })}
            </div>
          </DropdownButton>
        </span>
        <button
          type="submit"
          className="btn btn-success"
          disabled={!titleFilled}
        >
          Add Task
        </button>
      </form>
      <span className="card">
        <table className="table table-hover text-left">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "12%" }}></th>
              <th scope="col" style={{ width: "40%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "14%" }}>
                Completed
              </th>
              <th scope="col" style={{ width: "20%" }}>
                Actions
              </th>
              <th scope="col" style={{ width: "2%" }}></th>
            </tr>
          </thead>
          <tbody>
            {props.todoList.map((item) => {
              return (
                <tr key={item.id}>
                  <td></td>
                  <th
                    scope="row"
                    onClick={() => openDetailView(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}
                  </th>
                  <td>
                    <div className="custom-control custom-switch">
                      <input
                        key={item.id}
                        type="checkbox"
                        className="custom-control-input"
                        id="completed"
                        checked={item.complete}
                        onChange={() => {}}
                      />
                      <label
                        key={item.id}
                        className="custom-control-label"
                        htmlFor="completed"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          toggleTodo(item.id).then((e) => {
                            if (e.status === 404)
                              alert("The task could not be found");
                          });
                          props.update();
                        }}
                      ></label>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-sm btn-info mr-3"
                      onClick={() => openEditView(item.id)}
                    >
                      Edit Task
                    </button>
                    <button
                      type="button"
                      className="btn-sm btn-outline-danger"
                      onClick={() => {
                        setTaskDetails({ id: item.id, ...taskDetails });
                        setDeleteShow(true);
                      }}
                    >
                      Delete Task
                    </button>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </span>
      <Modal show={detailShow} onHide={handleDetailClose}>
        <Modal.Header>
          <Modal.Title>{taskDetails.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{taskDetails.description}</Modal.Body>
        <Modal.Footer>
          <span>
            <i>Task {!taskDetails.complete && "Not"} Completed</i>
          </span>
          {taskDetails.due !== null && taskDetails.due !== "" && (
            <span>
              <strong>Date due:</strong> {taskDetails.due.substring(0, 10)} at{" "}
              {taskDetails.due.substring(11, 16)}
            </span>
          )}
          <Button variant="secondary" onClick={handleDetailClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose}>
        <form onSubmit={(e) => handleEdit(e)}>
          <Modal.Header>
            <Modal.Title>
              Title:{" "}
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Title (required)"
                name="title"
                defaultValue={taskDetails.title}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Description:{" "}
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Description"
              defaultValue={taskDetails.description}
              name="desc"
            />
            <div class="row pt-2">
              <div class="col-8">
                Date Due:{" "}
                <input
                  className="form-control"
                  type="date"
                  name="due"
                  id="due"
                  defaultValue={
                    taskDetails.due !== null
                      ? taskDetails.due.substring(0, 10)
                      : ""
                  }
                />
              </div>
              <div class="col-4 pt-4">
                <DropdownButton
                  id="time-dropdown"
                  variant="secondary"
                  title={
                    taskDetails.due !== null ? taskDetails.due : "Time (UTC)"
                  }
                >
                  <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <Dropdown.Item onClick={() => setTimeTitle("Time (UTC)")}>
                      - Select -
                    </Dropdown.Item>
                    {[...Array(24)].map((e, i) => {
                      if (i < 10)
                        return (
                          <Dropdown.Item onClick={() => handleTime(i)}>
                            0{i}:00:00
                          </Dropdown.Item>
                        );
                      else
                        return (
                          <Dropdown.Item onClick={() => handleTime(i)}>
                            {i}:00:00
                          </Dropdown.Item>
                        );
                    })}
                  </div>
                </DropdownButton>
              </div>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="task-complete"
                defaultChecked={taskDetails.complete}
              />
              <label class="form-check-label" htmlFor="task-complete">
                Completed
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>Deleting {taskDetails.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleDeleteClose(taskDetails.id)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(taskDetails.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
