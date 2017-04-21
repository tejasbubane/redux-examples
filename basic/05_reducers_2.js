// Working Example: https://jsfiddle.net/tejasbubane/bzx0h9gL/
const toggleTodo = (todo) => {
  return {
    ...todo,
    done: !todo.done
  }
}
const testToggleTodo = () => {
  let todoBefore = {
    id: 2,
    text: 'Get the groceries',
    done: false
  };
  let todoAfter = {
    id: 2,
    text: 'Get the groceries',
    done: true
  }

  Object.freeze(todoBefore);
  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
console.log("All Tests Passed!");
