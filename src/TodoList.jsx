import React from "react";
import Todo from "./Todo";

export const TodoList = ({ todos, removeTodo, toggleTodo }) => {
  return (
    <div className="TodoList">
      {todos.map((todo, _i) => (
        <Todo
          todo={todo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
