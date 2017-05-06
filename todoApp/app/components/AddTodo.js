import React from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends React.Component {
  todoCounter = 0;

  addTodo = (e) => {
    e.preventDefault();
    this.context.store.dispatch({
      type: "ADD_TODO",
      id: this.todoCounter++,
      text: this.node.value
    });
    this.node.value = "";
  }

  render() {
    return (
      <form onSubmit={this.addTodo}>
        <input ref={node => this.node = node} />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
};
AddTodo.contextTypes = {
  store: PropTypes.object
};
