import React from 'react';

export default class AddTodo extends React.Component {
  addTodo = (e) => {
    e.preventDefault();
    this.props.store.dispatch({
      type: "ADD_TODO",
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
