import React from "react";
import "./App.css";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default ({ addTodo, todos, removeTodo, toggleTodo }) => (
  <div className="App">
    <AddTodo addTodo={addTodo} />
    <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
  </div>
);
