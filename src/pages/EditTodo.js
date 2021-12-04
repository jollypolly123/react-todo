import { createTodo, retrieveTodo, updateTodo, deleteTodo, toggleTodo } from "../apiCalls";

export function EditTodo(props) {

    return (
        <ul className="list-group py-3">
            Maintenance
        </ul>
    )
}

export function CreateTodo(props) {
    
    return (
        <ul className="list-group py-3">
            Maintenance
        </ul>
    )
}

export function DetailTodo(props) {
    retrieveTodo(props.id).then(e => {
        console.log(e);
    })
    return (
        <ul className="list-group py-3">
            Maintenance
        </ul>
    )
}