import { createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "../apiCalls";
import React, { useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';

export default function TodoList(props) {
    const [editShow, setEditShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        due: null,
        complete: false
    });
    const [titleFilled, setTitleFilled] = useState(false);
    const [timeTitle, setTimeTitle] = useState("Time (UTC)");
    const handleTitle = function(e) {
        if (e.target.value === "") setTitleFilled(false);
        else setTitleFilled(true);
    }
    const handleTime = function(time) {
        const timeFormat = time < 10 ? `0${time}:00:00` : `${time}:00:00`;
        setTimeTitle(timeFormat);
    }
    
    const handleDetailClose = () => setDetailShow(false);
  
    const handleEditClose = () => setEditShow(false);
    const handleEdit = () => setEditShow(false);


    const createNew = function(e) {
        e.preventDefault();
        if (e.target.due.value === "") {
            createTodo(e.target.title.value, e.target.desc.value).then(e => {
                if (e.status === 400) alert("Error: your task was not created");
            });
        } else {
            const due = `${e.target.due.value}T${timeTitle.length === 5 ? timeTitle : "00:00:00"}+00:00`
            createTodo(e.target.title.value, e.target.desc.value, "ok").then(e => {
                if (e.status === 400) alert("Error: your task was not created");
            });
        }
        e.target.title.value = "";
        e.target.desc.value = "";
        e.target.due.value = "";
        setTitleFilled(false);
        setTimeTitle("Time (UTC)");
        props.update();
    }

    const editModal = function(e) {
        console.log(e);
    }

    const openDetailView = function(e) {
        retrieveTodo(e).then(v => {
            v.json().then(item => {
                setTaskDetails({
                    title: item.title,
                    description: item.description,
                    due: item.due,
                    complete: item.complete

                });
            })
            setDetailShow(true);
        }).catch(err => {
            console.log(err);
        });
    }

    const openEditView = function(e) {
        retrieveTodo(e).then(v => {
            v.json().then(item => {
                console.log(item);
                setTaskDetails({
                    title: item.title,
                    description: item.description,
                    due: item.due,
                    complete: item.complete

                });
            })
            setEditShow(true);
        }
        ).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="container-fluid">
        <form className="form-inline px-5 py-3 justify-content-around row" onSubmit={e => createNew(e)}>
            <h3>Create New Task</h3>
            <input className="form-control mr-sm-2" type="text" placeholder="Title (required)" name="title" onChange={e => handleTitle(e)}/>
            <input className="form-control mr-sm-2" type="text" placeholder="Description" name="desc" />
            <span className="align-middle row">
                <span className="pt-1">Date Due:</span>
                <input className="form-control mr-sm-2 ml-2" type="date" name="due" id="due" />
                <DropdownButton id="time-dropdown" variant="secondary" title={timeTitle}>
                    <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                        <Dropdown.Item onClick={() => setTimeTitle("Time (UTC)")}>- Select -</Dropdown.Item>
                    {[...Array(24)].map((e, i) => {
                        if (i < 10) return <Dropdown.Item onClick={() => handleTime(i)}>0{i}:00:00</Dropdown.Item>
                        else return <Dropdown.Item onClick={() => handleTime(i)}>{i}:00:00</Dropdown.Item>
                    })}
                    </div>
                </DropdownButton>
            </span>
            <button type="submit" className="btn btn-success" disabled={!titleFilled}>Add Task</button>
        </form>
        <span className="card">
            <table className="table table-hover text-left">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" style={{width: "12%"}}></th>
                        <th scope="col" style={{width: "40%"}}>Name</th>
                        <th scope="col" style={{width: "14%"}}>Completed</th>
                        <th scope="col" style={{width: "20%"}}>Actions</th>
                        <th scope="col" style={{width: "2%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {props.todoList.map(item => {
                        return (
                            <tr key={item.id}>
                                <td></td>
                                <th scope="row" onClick={() => openDetailView(item.id)} style={{ cursor: "pointer" }}>{item.title} {item.id}</th>
                                <td><div className="custom-control custom-switch">
                                    <input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id="completed" 
                                        checked={item.complete}
                                        onChange={()=>{}} />
                                    <label className="custom-control-label" for="completed" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            toggleTodo(item.id);
                                            props.update();
                                            console.log(item.id);}}></label>
                                    </div></td>
                                <td>
                                    <button type="button" className="btn-sm btn-info mr-3" onClick={() => openEditView(item.id)}>Edit Task</button>
                                    <button type="button" className="btn-sm btn-outline-danger" onClick={() => {deleteTodo(item.id)}}>Delete Task</button>
                                </td>
                                <td></td>
                            </tr>
                        )
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
            {taskDetails.complete && <span><i>Task Completed</i></span>}
            {(taskDetails.due !== null) && <span><strong>Date due:</strong> {taskDetails.due}</span>}
            <Button variant="secondary" onClick={handleDetailClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
          
        <Modal show={editShow} onHide={handleEditClose}>
            <form onSubmit={e => editModal(e)}>
            <Modal.Header>
                <Modal.Title>
                    Title:
                    <input 
                        className="form-control mr-sm-2" 
                        type="text" 
                        placeholder="Title (required)" 
                        name="title" 
                        value={taskDetails.title} onChange={e => handleTitle(e)}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Description: <input className="form-control mr-sm-2" type="text" placeholder="Description" value={taskDetails.description} name="desc" />
                Date Due: <input className="form-control" type="date" name="due" id="due" />
            </Modal.Body>
            <Modal.Footer>
                {taskDetails.complete && <span><i>Task Completed</i></span>}
                {(taskDetails.due !== null) && <span><strong>Date due:</strong> {taskDetails.due}</span>}
                <Button variant="secondary" onClick={handleEditClose}>
                Cancel
                </Button>
                <Button variant="primary" type="submit">
                Save Changes
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
        </div>
    )
}