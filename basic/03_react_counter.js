// Working Example: https://jsfiddle.net/tejasbubane/gjkjf8re/2/
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

const store = Redux.createStore(counter);

const Counter = (props) => {
  return (
    <div>
      <h1>{props.value}</h1>
      <button onClick={props.onIncrement}>+</button>
      <button onClick={props.onDecrement}>-</button>
    </div>
  );
};

const render = () => {
  ReactDOM.render(
    <Counter
    value={store.getState()}
        onIncrement={() => store.dispatch({type: "INCREMENT"})}
        onDecrement={() => store.dispatch({type: "DECREMENT"})}
    />,
    document.getElementById("app")
  );
};

store.subscribe(render);
render();
