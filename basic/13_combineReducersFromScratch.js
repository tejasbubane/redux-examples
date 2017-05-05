// Working example: https://jsfiddle.net/dvq57vkn/

const expect = require('expect');

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch(action.type) {
  case "SET_VISIBILITY":
    return action.visibility;
  default:
    return state;
  }
};


const todo = (state = {}, action) => {
  switch(action.type) {
  case "ADD_TODO":
    return {
      id: action.id,
      text: action.text,
      completed: false
    };
  case "TOGGLE_TODO":
    if(state.id === action.id)
      return Object.assign({}, state, {completed: !state.completed});
    else
      return state;
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
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
};

const app = combineReducers({
  todos,
  visibilityFilter
});

const testVisibilityFilter = () => {
  let stateBefore = {
    todos: [],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {
    type: "SET_VISIBILITY",
    visibility: "COMPLETED"
  };
  let stateAfter = {
    todos: [],
    visibilityFilter: "COMPLETED"
  };

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(app(stateBefore, action)).toEqual(stateAfter);
};

const testAddTodo = () => {
  let stateBefore = {
    todos: [],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {
    type: "ADD_TODO",
    id: 1,
    text: "Buy rice"
  };
  let stateAfter = {
    todos: [
      {
        id: 1,
        text: "Buy rice",
        completed: false
      }
    ],
    visibilityFilter: "SHOW_ALL"
  };

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(app(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  let stateBefore = {
    todos: [
      {
        id: 1,
        text: "Pay electricity bill",
        completed: false
      },
      {
        id: 2,
        text: "Get veggies",
        completed: false
      }
    ],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {
    type: "TOGGLE_TODO",
    id: 2
  };
  let stateAfter = {
    todos: [
      {
        id: 1,
        text: "Pay electricity bill",
        completed: false
      },
      {
        id: 2,
        text: "Get veggies",
        completed: true
      }
    ],
    visibilityFilter: "SHOW_ALL"
  };

  expect(app(stateBefore, action)).toEqual(stateAfter);
};

testVisibilityFilter();
testAddTodo();
testToggleTodo();

console.log("All test passed!");
