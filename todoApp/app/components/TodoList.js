import React from 'react';
import PropTypes from 'prop-types';

import Todo from 'Todo';

export default class TodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
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
    this.context.store.dispatch({
      type: "TOGGLE_TODO",
      id: id
    });
  }

  render() {
    let { todos, visibility } = this.context.store.getState();

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
};

TodoList.contextTypes = {
  store: PropTypes.object
};
