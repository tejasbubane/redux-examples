// Working Example: https://jsfiddle.net/tejasbubane/uwcj83r4/
// Run this example from current directory: `node 10_visibility_filter.js`

const expect = require('expect');

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch(action.type) {
    case "SET_VISIBILITY":
      return action.visibility;
    default:
      return state;
  }
};

const testVisibilityFilter = () => {
  let stateBefore = undefined,
      action = {
        type: "SET_VISIBILITY",
        visibility: "COMPLETED"
      },
      stateAfter = "COMPLETED";

  Object.freeze(stateBefore);
  Object.freeze(action);
  expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
};

testVisibilityFilter();
console.log("All Tests Passed!");
