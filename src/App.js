import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Task from './components/tasks/Task';
import Footer from './components/footer/Footer';
import AddTask from './components/add-task/AddTask';
import CompletedTask from './components/completed-task/CompletedTask';
import Axios from 'axios';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [],
      openNewTodo: false
    }
  }

  componentDidMount = () => {
    Axios.get('/posts').then((response) => {
      const updatedResponse = response.data.slice(1, 10);
      const tasks = [];
      updatedResponse.map((result, index) => {
        const priority = ['Medium', 'High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Low', 'Medium', 'High'];
        const completed = [true, false, true, true, false, true, false, false, false, false];
        tasks.push({
          title: result.title,
          description: result.body,
          completed: completed[index],
          priority: priority[index]
        });
      });
      this.setState({
        tasks: tasks
      })
    });
  };


  updateTaskState(tasks) {
    this.setState({
      tasks: tasks
    });
  }

  toggleTodoHandler(state) {
    this.setState({
      openNewTodo: state
    });
  }

  addNewTodoHandler(data) {
    const { tasks } = this.state;
    tasks.push(data);
    this.updateTaskState(tasks);
    this.toggleTodoHandler(false);
  }

  deleteTaskHandler(index) {
    const { tasks } = this.state;
    tasks.splice(index, 1);
    this.updateTaskState(tasks);
  }

  removeCompletedTaskHandler(index) {
    const { tasks } = this.state;
    tasks[index].completed = false;
    this.updateTaskState(tasks);
  }

  addCompletedTaskHandler(index) {
    const { tasks } = this.state;
    tasks[index].completed = true;
    this.updateTaskState(tasks);
  }

  render() {
    const { tasks, openNewTodo } = this.state;

    return (
      <div className="App">

        {/* Header of the app */}
        <Header />

        {/* Section of the app */}
        <section className="todo-list-container">
          <div className="todo-in-progress">
            <h2> Working tasks</h2>
            <ul onDragStart={() => { console.log('on drag called') }} className="todo-list" id="target">

              {/* Warning Task */}
              {
                tasks.map((task, index) => {
                  // setting index as  a key is not a good way
                  if (!task.completed) {
                    return <Task
                      task={task}
                      key={index}
                      deleteTaskHandler={() => { this.deleteTaskHandler(index) }}
                      addCompletedTaskHandler={() => { this.addCompletedTaskHandler(index) }}
                    />
                  }
                })
              }

              {/* To add new todo task */}
              <li className="todo-item new">
                <div className="card" onClick={() => this.toggleTodoHandler(true)}>
                  <h3 className="todo-title"> <span className="action">
                    <i className="complete material-icons md-36 md-light">add_circle_outline</i>
                  </span>
                    <span className="title">ADD A TODO</span></h3>
                </div>
              </li>

              {/* New Task creator form pop up */}
              <AddTask
                openNewTodo={openNewTodo}
                toggleTodoHandler={this.toggleTodoHandler.bind(this)}
                addNewTodoHandler={this.addNewTodoHandler.bind(this)}
              />

            </ul>
          </div>

          {/* completed todo task of app */}
          <div className="todo-completed">
            <ul className="todo-list-completed">
              <h2> Completed Tasks </h2>
              {
                tasks.map((task, index) => {
                  if (task.completed) {
                    return <CompletedTask
                      completedTask={task}
                      key={index}
                      removeCompletedTaskHandler={this.removeCompletedTaskHandler.bind(this, index)}
                    />
                  }
                })
              }
            </ul>
          </div>
        </section>

        {/* Footer of the app */}
        <Footer />
      </div>
    )
  }
}
