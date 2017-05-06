import React from 'react';

import Todo from 'Todo';

export default class TodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  filteredTodos(todos, visibility) {
    switch(visibility) {
    case "COMPLETED":
      return todos.filter(todo => todo.completed);
    case "PENDING":
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
    }
  }

  toggleTodo = (id) => {
    console.log(id);
    this.props.store.dispatch({
      type: "TOGGLE_TODO",
      id: id
    });
  }

  render() {
    let { todos, visibility } = this.props.store.getState();

    return(
      <ul>
        {
          this.filteredTodos(todos, visibility).map(todo => {
            return <Todo key={todo.id} todo={todo} onClick={this.toggleTodo}/>;
          })
        }
      </ul>
    );
  }
}
