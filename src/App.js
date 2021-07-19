import React, { Component } from "react";
import "./App.css";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddTodo addTodo={this.props.addTodo} />
        <TodoList
          todos={this.props.todos}
          removeTodo={this.props.removeTodo}
          toggleTodo={this.props.toggleTodo}
        />
      </div>
    );
  }
}

export default App;
