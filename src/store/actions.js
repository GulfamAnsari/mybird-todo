import localForage from 'localforage';

export const updateTask = (value) => {
  return (dispatch) => {
    const tasks = {
      type: 'UPDATE_TASK',
      value: value
    }
    localForage.setItem('tasks', tasks).then((success) => {
      dispatch(success);
    });
  }
}

export const fetchTasks = (value) => {
  return (dispatch) => {
    const tasks = {
      type: 'FETCH_TASKS_DATA',
      value: value
    }
    localForage.setItem('tasks', tasks).then((success) => {
      dispatch(success);
    });
  }
}