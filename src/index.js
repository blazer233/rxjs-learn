import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Subject } from "rxjs";
import { scan } from "rxjs/operators";
import { v4 as uuidv4 } from "uuid";

const store = new Subject();
const initialState = {
  todos: [
    {
      completed: false,
      text: "Finish app",
      id: uuidv4(),
    },
  ],
};
const addTodo = text => state => ({
  ...state,
  todos: [
    ...state.todos,
    {
      completed: false,
      text,
      id: uuidv4(),
    },
  ],
});

const removeTodo = id => state => ({
  ...state,
  todos: state.todos.filter(todo => todo.id !== id),
});

const toggleTodo = id => state => ({
  ...state,
  todos: state.todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ),
});
console.log(store);
store
  //acc:initialState f:x => x
  .pipe(scan((acc, f) => f(acc), initialState))
  .subscribe(state => {
    console.log(state);
    return ReactDOM.render(
      <App
        todos={state.todos}
        addTodo={text => store.next(addTodo(text))}
        removeTodo={id => store.next(removeTodo(id))}
        toggleTodo={id => store.next(toggleTodo(id))}
      />,
      document.getElementById("root")
    );
  });

store.next(x => x);
