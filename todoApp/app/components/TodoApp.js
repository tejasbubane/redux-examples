import React from 'react';
import { combineReducers, createStore } from 'redux';

// Components
import AddTodo from 'AddTodo';
import TodoList from 'TodoList';
import FilterList from 'FilterList';

// Reducers
import todos from 'todos';
import visibility from 'visibility';

const app = combineReducers({
  todos,
  visibility
});
const store = createStore(app);

const TodoApp = () => (
  <div>
    <h1>TODOs</h1>
    <AddTodo store={store}/>
    <TodoList store={store}/>
    <FilterList store={store}/>
  </div>
);

export default TodoApp;
