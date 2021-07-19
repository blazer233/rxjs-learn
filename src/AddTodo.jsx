import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    value: "",
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  addTodo = event => {
    event.preventDefault();
    const text = this.state.value.trim();
    if (!text) return;
    this.props.addTodo(text);
    this.setState({ value: "" });
  };

  render() {
    return (
      <div className="add-todo">
        <input type="text" onChange={this.onChange} value={this.state.value} />
        <button type="submit" onClick={this.addTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default AddTodo;
