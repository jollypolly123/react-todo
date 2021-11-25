export default function TodoList(props) {
    return (
        <ul className="list-group py-3">
            {props.todoList.map(item => {
                return (<li className="list-group-item">{item}</li>)
            })}
        </ul>
    )
}