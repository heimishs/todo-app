import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReduxState } from "../types/types";

export default function DoneList() {
  let todoList = useSelector((state: ReduxState) => state.todo.list);
  todoList = todoList.filter((todo) => todo.done === true);
  return (
    <section className="doneTodo">
      <h3>
        <FontAwesomeIcon icon={faThumbsUp} /> 완료 목록
      </h3>
      <ul className="list">
        {todoList.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
