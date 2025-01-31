import { combineReducers } from "redux";
import { todoReducer } from "./modules/todo";

export default combineReducers({
  todo: todoReducer,
});
