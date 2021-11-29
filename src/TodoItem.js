import { checkStatus, listTodos, createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "./apiCalls";

export default function TodoItem(item) {

    return (
        <div class="item-detail">
            <div class="title">
            {item.title}
            </div>
            <div class="info">
            <h1>{item.due}</h1>
                <p>{item.description}</p>
            </div>
            <div class="links">
                <select class="dropdown">
                    <option value="title">LOREM</option>
                    <option value="item">lorem</option>
                    <option value="item">lorem</option>
                </select>
                <select class="dropdown">
                    <option value="title">LOREM</option>
                    <option value="item">lorem</option>
                    <option value="item">lorem</option>
                </select>
                <select class="dropdown">
                    <option value="title">LOREM</option>
                    <option value="item">lorem</option>
                    <option value="item">lorem</option>
                </select>
            </div>
            <button type="button" className="btn-sm btn-info mr-3" onClick={() => {}}>Edit Task</button>
            <button type="button" className="btn-sm btn-outline-danger" onClick={() => {}}>Delete Task</button>
        </div>
    )
}