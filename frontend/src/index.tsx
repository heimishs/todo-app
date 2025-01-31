import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/index";
import { Provider } from "react-redux";

// as는 타입스크립트에서 형변환을 하는 문법 = document.getElementById("root") 선택이 안될 수 있기 때문에 명시적으로 타입을 지정
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// store 설정
const store = configureStore({ reducer: rootReducer });
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
