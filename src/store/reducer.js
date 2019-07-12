const initialState = {
  taskState: {
    tasks: []
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