import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';

import TodoApp from 'TodoApp';

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
};
Provider.childContextTypes = {
  store: React.PropTypes.object
};

// Reducers
import todos from 'todos';
import visibility from 'visibility';

const app = combineReducers({
  todos,
  visibility
});

ReactDOM.render(
  <Provider store={createStore(app)}>
    <TodoApp />
  </Provider>,
  document.getElementById("app")
);
