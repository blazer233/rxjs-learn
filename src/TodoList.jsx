import React from "react";
import Todo from "./Todo";

export const TodoList = ({ todos, removeTodo, toggleTodo }) => {
  const elements = todos.map((todo, _i) => (
    <Todo
      todo={todo}
      removeTodo={removeTodo}
      toggleTodo={toggleTodo}
      key={todo.id}
    />
  ));
  return <div className="TodoList">{elements}</div>;
};

export default TodoList;
