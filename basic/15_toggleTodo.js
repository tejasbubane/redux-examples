// Add todos filter
// Working Example: https://jsfiddle.net/tejasbubane/qormgmeg/1/

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

const FilterButton = (props) => {
  if(props.currentFilter === props.visibility) return <span>{props.text}</span>;

  return(
    <button onClick={() => {
        store.dispatch({
          type: "SET_VISIBILITY",
          visibility: props.visibility
        });
      }}>{props.text}</button>
  );
}

let nextTodoId = 0;
class TodoApp extends Component {
  toggleTodo(id) {
    store.dispatch({
      type: "TOGGLE_TODO",
      id: id
    });
  }

  filteredTodos() {
    let {todos, visibilityFilter} = this.props;
    switch(visibilityFilter) {
    case "COMPLETED":
      return todos.filter(todo => todo.completed);
    case "PENDING":
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
    }
  }

  renderTodos() {
    console.log(this.props.visibility);
    console.log(this.filteredTodos());
    return this.filteredTodos().map(todo => (
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
          <FilterButton visibility="SHOW_ALL" text="All"
                        currentFilter={this.props.visibilityFilter}/>
          <FilterButton visibility="COMPLETED" text="Completed"
                        currentFilter={this.props.visibilityFilter}/>
          <FilterButton visibility="PENDING" text="Pending"
                        currentFilter={this.props.visibilityFilter}/>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById("app")
  );
};

store.subscribe(render);
render();
