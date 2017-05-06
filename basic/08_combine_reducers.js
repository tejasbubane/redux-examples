// Simply combining reducers the previous two reducers ADD_TODO and TOGGLE_TODO
// Working example: https://jsfiddle.net/tejasbubane/wehnv853/
// Run this example from current directory: `node 08_combine_reducers.js`

const expect = require('expect');

const todos = (state = [], action) => {
  switch(action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(todo => {
        if(todo.id === action.id) {
          return Object.assign({}, todo, {completed: !todo.completed});
        }

        return todo;
      });
    default:
      return state;
  }
};

const testAddTodo = () => {
  let stateBefore = [],
      action = {
        type: "ADD_TODO",
        id: 1,
        text: "Get some bread"
      },
      stateAfter = [
        {
          id: 1,
          text: "Get some bread",
          completed: false
        }
      ];
  Object.freeze(stateBefore);
  Object.freeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  let stateBefore = [
    {
      id: 1,
      text: "Get some bread",
      completed: false
    },
    {
      id: 2,
      text: "Get some butter",
      completed: false
    }
  ];
  let action = {
    type: "TOGGLE_TODO",
    id: 2
  };
  let stateAfter = [
    {
      id: 1,
      text: "Get some bread",
      completed: false
    },
    {
      id: 2,
      text: "Get some butter",
      completed: true
    }
  ];

  Object.freeze(stateBefore);
  Object.freeze(stateAfter);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log("All tests passed!");
