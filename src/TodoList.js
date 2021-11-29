import { createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "./apiCalls";
import TodoItem from "./TodoItem";

export default function TodoList(props) {

    return (
        <table className="table table-hover text-left">
            <thead className="thead-light">
                <tr>
                    <th scope="col" style={{width: "3%"}}></th>
                    <th scope="col" style={{width: "20%"}}>Name</th>
                    <th scope="col" style={{width: "20%"}}>Due Date</th>
                    <th scope="col" style={{width: "40%"}}>Description</th>
                    <th scope="col" style={{width: "20%"}}><button type="button" className="btn btn-success">Add Task</button></th>
                    <th scope="col" style={{width: "3%"}}></th>
                </tr>
            </thead>
            <tbody>
                {props.todoList.map(item => {
                    return (
                        <tr key={item.id} onClick={() => props.onClick(item)}>
                            <td></td>
                            <th scope="row">{item.title}</th>
                            <td>{item.due}</td>
                            <td>{item.description}</td>
                            <td>
                                <button type="button" className="btn-sm btn-info mr-3" onClick={() => {}}>Edit Task</button>
                                <button type="button" className="btn-sm btn-outline-danger" onClick={() => {}}>Delete Task</button>
                            </td>
                            <td></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}