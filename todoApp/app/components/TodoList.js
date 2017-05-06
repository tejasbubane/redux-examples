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

  toggleTodo = (id) => {
    console.log(id);
    this.props.store.dispatch({
      type: "TOGGLE_TODO",
      id: id
    });
  }

  render() {
    let todos = this.props.store.getState().todos;

    return(
      <ul>
        {
          todos.map(todo => {
            return <Todo key={todo.id} todo={todo} onClick={this.toggleTodo}/>;
          })
        }
      </ul>
    );
  }
}
