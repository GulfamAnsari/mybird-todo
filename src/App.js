import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Task from './components/tasks/Task';
import Footer from './components/footer/Footer';
import AddTask from './components/add-task/AddTask';
import CompletedTask from './components/completed-task/CompletedTask';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [
        {
          title: 'Learn React',
          description: 'Build great modularize javascript apps with React JS',
          priority: 'High',
          completed: true
        },
        {
          title: 'Learn Angular',
          description: 'Build great modularize javascript apps with React JS',
          priority: 'High',
          completed: false
        },
        {
          title: 'Learn React Native',
          description: 'Build great modularize javascript apps with React JS',
          priority: 'Medium',
          completed: true
        },
        {
          title: 'Learn Android',
          description: 'Build great modularize javascript apps with React JS',
          priority: 'Low',
          completed: false
        },
        {
          title: 'Learn Node',
          description: 'Build great modularize javascript apps with React JS',
          priority: 'Medium',
          completed: false
        }
      ],
      openNewTodo: false
    }
  }

  toggleTodoHandler(state) {
    this.setState({
      openNewTodo: state  
    });
  }

  addNewTodoHandler() {
    console.log('console.lo')
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
                    return <Task task={task} key={index} />
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
              <AddTask openNewTodo={openNewTodo} toggleTodoHandler={this.toggleTodoHandler.bind(this)} />

            </ul>
          </div>

          {/* completed todo task of app */}
          <div className="todo-completed">
            <ul className="todo-list-completed">
              <h2> Completed Tasks </h2>
              {
                tasks.map((task, index) => {
                  if (task.completed) {
                    return <CompletedTask completedTask={task} key={index} />
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
