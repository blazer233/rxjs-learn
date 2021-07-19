import React, { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");
  return (
    <div className="add-todo">
      <input
        type="text"
        onChange={({ target: { value } }) => setValue(value)}
        value={value}
      />
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          if (!value.trim()) return;
          addTodo(value);
          setValue("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
export default AddTodo;
