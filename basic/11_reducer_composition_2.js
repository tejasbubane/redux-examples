// Working Example: https://jsfiddle.net/tejasbubane/kbb939pd/

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch(action.type) {
    case "SET_VISIBILITY":
      return action.visibility;
    default:
      return state;
  }
};

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
        return {
          ...state,
          completed: !state.completed
        };
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
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
};

const testAddTodo = () => {
  let stateBefore = {
    todos: [
      {id: 1, text: "Milk", completed: false}
    ],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {
    type: "ADD_TODO",
    id: 2,
    text: "Bread"
  };
  let stateAfter = {
    todos: [
      {id: 1, text: "Milk", completed: false},
      {id: 2, text: "Bread", completed: false}
    ],
    visibilityFilter: "SHOW_ALL"
  };
  Object.freeze(stateBefore);
  Object.freeze(stateAfter);
  expect(todoApp(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  let stateBefore = {
    todos: [
      {id: 1, text: "Milk", completed: false},
      {id: 2, text: "Bread", completed: false}
    ],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {type: "TOGGLE_TODO", id: 2};
  let stateAfter = {
    todos: [
      {id: 1, text: "Milk", completed: false},
      {id: 2, text: "Bread", completed: true}
    ],
    visibilityFilter: "SHOW_ALL"
  };
  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todoApp(stateBefore, action)).toEqual(stateAfter);
}

const testVisibilityFilter = () => {
  let stateBefore = {
    todos: [],
    visibilityFilter: "SHOW_ALL"
  };
  let action = {type: "SET_VISIBILITY", visibility: "COMPLETED"};
  let stateAfter = {
    todos: [],
    visibilityFilter: "COMPLETED"
  };
  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todoApp(stateBefore, action)).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
testVisibilityFilter();

console.log("All tests passed!");
