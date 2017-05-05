// Add functionality to toggle Todos
// Working Example: https://jsfiddle.net/tejasbubane/w23xwtbx/

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

const { combineReducers, createStore }  = Redux;

const app = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(app);

const { Component } = React;

let nextTodoId = 0;
class TodoApp extends Component {
  toggleTodo(id) {
    store.dispatch({
      type: "TOGGLE_TODO",
      id: id
    });
  }

  renderTodos() {
    return this.props.todos.map(todo => (
      <li key={todo.id}
          onClick={() => this.toggleTodo(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}>
        {todo.text}
      </li>
    ));
  }

  render() {
    return(
      <div>
        <input ref={(node) => this.node = node}/>
        <button onClick={() => {
            store.dispatch({
              type: "ADD_TODO",
              text: this.node.value,
              id: nextTodoId++
            });
            this.node.value = "";
          }}>Add Todo</button>

        <ul>
          {this.renderTodos()}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById("app")
  );
};

store.subscribe(render);
render();
