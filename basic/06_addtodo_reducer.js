// Working Example: https://jsfiddle.net/tejasbubane/0za739oc/
const addTodos = (state = [], action) => {
  switch(action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state;
  }
}

const testAddTodos = () => {
  let beforeState = [],
      action = {
        type: "ADD_TODO",
        id: 1,
        text: "Buy milk and bread"
      },
      afterState = [
        {
          id: 1,
          text: "Buy milk and bread",
          completed: false
        }
      ];

  Object.freeze(beforeState);
  Object.freeze(action);
  expect(addTodos(beforeState, action)).toEqual(afterState);
}

testAddTodos();
console.log("All Tests Passed!");
