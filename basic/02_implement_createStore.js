// Working example: https://jsfiddle.net/tejasbubane/ebteqoru/
const counter = (state = 0, action) => {
  switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state,
      listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action); // call reducer to get new state
    listeners.forEach(listener => listener()); // call all listeners
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  dispatch({}); // initialize the reducer state
  return {getState, dispatch, subscribe};
};

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};
store.subscribe(render);
render();

document.addEventListener("click", () => {
  store.dispatch({type: "INCREMENT"});
});
