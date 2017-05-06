import React from 'react';

export default class TodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let todos = this.props.store.getState().todos;

    return(
      <ul>
        {
          todos.map(todo => {
            return <li key={todo.id}>{todo.text}</li>;
          })
        }
      </ul>
    );
  }
}
