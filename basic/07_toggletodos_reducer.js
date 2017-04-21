// Working Example: https://jsfiddle.net/tejasbubane/2u6y6c1g/
const toggleTodos = (state = [], action) => {
  switch(action.type) {
    case "TOGGLE_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    default:
      return state;
  }
};
const testToggleTodos = () => {
  let beforeTodos = [
    {
      id: 0,
      text: "Buy veggies",
      completed: false
    },
    {
      id: 1,
      text: "Pay electricity bill",
      completed: false
    }
  ];
  let action = {
    type: "TOGGLE_TODO",
    id: 1
  }
  let afterTodos = [
    {
      id: 0,
      text: "Buy veggies",
      completed: false
    },
    {
      id: 1,
      text: "Pay electricity bill",
      completed: true
    }
  ];

  Object.freeze(beforeTodos);
  Object.freeze(action);
  expect(toggleTodos(beforeTodos, action)).toEqual(afterTodos);
};

testToggleTodos();
console.log("All Tests Passed!");
