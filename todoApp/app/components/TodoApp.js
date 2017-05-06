import React from 'react';

// Components
import AddTodo from 'AddTodo';
import TodoList from 'TodoList';
import FilterList from 'FilterList';

const TodoApp = () => (
  <div>
    <h1>TODOs</h1>
    <AddTodo/>
    <TodoList/>
    <FilterList/>
  </div>
);

export default TodoApp;
