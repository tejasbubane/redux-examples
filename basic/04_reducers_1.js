// Working Example: https://jsfiddle.net/tejasbubane/5y81tz9p/
const addCounter = (counters) => {
  return [...counters, 0];
}
const testAddCounter = () => {
  let listBefore = [],
      listAfter = [0];

  Object.freeze(listBefore);
  expect(addCounter(listBefore, 1)).toEqual(listAfter);
}

const removeCounter = (counters, index) => {
  return [
    ...counters.slice(0, index),
    ...counters.slice(index + 1)
  ];
}
const testRemoveCounter = () => {
  let listBefore = [1, 12, 4, 5],
      listAfter = [1, 12, 5];
  Object.freeze(listBefore);
  expect(removeCounter(listBefore, 2)).toEqual(listAfter);
}

const incrementCounter = (counters, index) => {
  return [
    ...counters.slice(0, index),
    counters[index] + 1,
    ...counters.slice(index + 1)
  ];
}
const testIncrementCounter = () => {
  let listBefore = [1, 3, 6, 2],
      listAfter = [1, 4, 6, 2];

  Object.freeze(listBefore);
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log("All Tests passed!")
