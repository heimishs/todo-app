import {
  faCheck,
  faL,
  faPeace,
  faPencil,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, done, del, update } from "../store/modules/todo";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReduxState, Todo } from "../types/types";

export default function TodoList() {
  // useSelector()를 통해서 store의 state 가져오기
  let todoList = useSelector((state: ReduxState) => state.todo.list);
  //   console.log(todoList);

  todoList = todoList.filter((todo: Todo) => todo.done === false);

  const nextID = useSelector((state: ReduxState) => state.todo.nextID);
  //   전달하기 위한 useDispatch()를 통해서 전달
  const dispatch = useDispatch();
  // 타입스크립트에선 null 기본값을 줘야하고 타입<>을 지정해야하고 null일 경우에 대한 처리를 따로해야함
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // 할 일 추가 POST /todo
  const createTodo = async () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      // state를 변경해서 화면을 바꾸는 것
      dispatch(create({ id: nextID, text: inputRef.current.value }));
    }

    // DB 정보를 바꾸기 위해서 axios 요청
    await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
      text: inputRef.current?.value,
    });
    clearInput();
  };

  // todo 상태 변경 PATCH /todo/:todoId
  const toDone = async (id: number) => {
    // state 를 변경해서 화면을 바꾸는것
    dispatch(done(id));

    // DB 정보를 바꾸기 위해 axios 요청
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };

  const enterTodo = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const deleteTodo = async (todoId: number) => {
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
    dispatch(del(todoId));
  };

  // todo 수정
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const getTodo = (todoId: number) => {
    // 1. 수정모드로 변경하여 버튼 모양 변경
    // 2. 수정하고 싶은 text 값 input value로 넣어주기
    setIsUpdateMode(true); // 수정모드로 변경
    const [todo] = todoList.filter((to) => to.id === todoId); //{} 로 들어감
    console.log(todo);
    if (inputRef.current) inputRef.current.value = todo.text;
    setUpdateId(todoId);
  };

  const cancelUpdate = () => {
    setIsUpdateMode(false);
    clearInput();
  };

  const updateTodo = async () => {
    const inputValue = inputRef.current?.value as string; // as 로 값이 없어도 string 으로 지정
    // DB 데이터 변경
    const res = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/content/`,
      {
        id: updateId,
        text: inputValue,
      }
    );
    console.log(res.data);

    if (res.data.isSuccess) {
      cancelUpdate();
      dispatch(update(updateId, inputValue));
    }
  };

  return (
    <main>
      <section className="todo">
        <h3>할 일 목록</h3>
        <div className="inputForm">
          <input type="text" ref={inputRef} onKeyDown={enterTodo} />
          {isUpdateMode ? (
            <>
              <button onClick={updateTodo}>수정</button>
              <button onClick={cancelUpdate}>취소</button>
            </>
          ) : (
            <button onClick={createTodo}>추가</button>
          )}
        </div>
        <ul className="list">
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <button onClick={() => toDone(todo.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <span>{todo.text}</span>
                <button onClick={() => getTodo(todo.id)}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
