// Reducer composition using arrays
// Working example: https://jsfiddle.net/tejasbubane/xq79v4xh/
// Run this example from current directory: `node 09_reducer_composition_1.js`

const expect = require('expect');

const todo = (state, action) => {
  // state here refers to a single todo
  switch(action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if(state.id === action.id) {
        return Object.assign({}, state, {completed: !state.completed});
      }
      else {
        return state;
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch(action.type) {
    case "ADD_TODO":
      return [
        ...state,
        todo(undefined, action)
      ];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

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
  ]

  Object.freeze(stateBefore);
  Object.freeze(stateAfter);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log("All tests passed!");
