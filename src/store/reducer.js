const initialState = {
  taskState: {
    tasks: []
  },
  authState: {
    isAuthenticated: false
  }
}

const Reducer = (state = initialState, action) => {
  const taskState = {};
  switch (action.type) {
    case 'UPDATE_TASK':
      taskState['tasks'] = action.value;
      taskState['openNewTodo'] = false;
      return {
        ...state,
        taskState: taskState
      }

    default:
      return state;
  }
}

export default Reducer;