export default function ErrorPage(props) {
    return (
        <ul className="list-group py-3">
            <li className="list-group-item">{props.error}</li>
        </ul>
    )
}