const initialState = {
  taskState: {
    tasks: [],
    openNewTodo: false
  },
  authState: {
    selectedForm: 'sign-in',
    signIn: {
      username: '',
      password: '',
      remebmer: false
    },
    signUp: {
      username: '',
      password: '',
      repeat: '',
      email: ''
    }
  }
}

const Reducer = (state = initialState, action) => {
  if (action.type === 'updateTasks') {
    const taskState = {
      tasks: action.value,
      openNewTodo: false
    }
    return {
      ...state,
      taskState: taskState
    }
  }
  if (action.type === 'toggleTodoHandler') {
    const taskState = {
      ...state.taskState,
      openNewTodo: action.value
    }
    return {
      ...state,
      taskState: taskState
    }
  }
  return state;
}

export default Reducer;