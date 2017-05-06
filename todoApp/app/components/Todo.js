import React from 'react';

const Todo = ({ todo, onClick }) => {
  return (
    <li onClick={() => onClick(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}>
      {todo.text}
    </li>
  );
};

export default Todo;
