import React from "react";
import "./Todo.css";

const Todo = ({ todo, toggleTodo, removeTodo }) => (
  <div className="todo">
    <input
      type="checkbox"
      className="todo-check"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    <span className={todo.completed ? "todo-completed todo-text" : "todo-text"}>
      {todo.text}
    </span>
    <button onClick={() => removeTodo(todo.id)}>x</button>
  </div>
);

export default Todo;
