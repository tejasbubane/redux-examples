import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from 'TodoApp';

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
