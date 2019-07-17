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