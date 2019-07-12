import React, { Component } from 'react';
import AddTask from '../add-task/AddTask';
import CompletedTask from '../completed-task/CompletedTask';
import Task from '../tasks/Task';
import Axios from 'axios';
import { connect } from 'react-redux';

class Section extends Component {

    constructor(props) {
        super(props);
    }

    updateTaskState(tasks) {
        // Use setState function argument as a function if your new state is dependent on
        // prevous one else you should use object as argument
        this.setState((prevState, props) => {
            return { tasks: tasks };
        });
    }


    addNewTodoHandler(data) {
        const { tasks } = this.props.taskState;
        tasks.push(data);
        this.props.updateTasks(tasks);
        this.props.toggleTodoHandler(false);
    }

    deleteTaskHandler(index) {
        const { tasks } = this.props.taskState;
        tasks.splice(index, 1);
        this.props.updateTasks(tasks);
    }

    removeCompletedTaskHandler(index) {
        const { tasks } = this.props.taskState;
        tasks[index].completed = false;
        this.props.updateTasks(tasks);
    }

    addCompletedTaskHandler(index) {
        const { tasks } = this.props.taskState;
        tasks[index].completed = true;
        this.props.updateTasks(tasks);
    }

    render() {
        const { tasks, openNewTodo } = this.props.taskState;

        console.log(tasks)

        return (
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
                            <div className="card" onClick={() => this.props.toggleTodoHandler(true)}>
                                <h3 className="todo-title"> <span className="action">
                                    <i className="complete material-icons md-36 md-light">add_circle_outline</i>
                                </span>
                                    <span className="title">ADD A TODO</span></h3>
                            </div>
                        </li>

                        {/* New Task creator form pop up */}
                        <AddTask
                            openNewTodo={openNewTodo}
                            toggleTodoHandler={this.props.toggleTodoHandler.bind(this)}
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
        )
    }

    /**
   * This Lifecycle function once when the component is created after the
   * render() method. So because it runs only once, you can do some request
   * to fetch the application data.
   */
    componentDidMount = () => {
        Axios.get('/posts').then((response) => {
            const updatedResponse = response.data.slice(1, 10);
            const tasks = [];
            updatedResponse.map((result, index) => {
                // for better UI
                const priority = ['Medium', 'High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Low', 'Medium', 'High'];
                const completed = [true, false, true, true, false, true, false, false, false, false];
                /***/
                tasks.push({
                    title: result.title,
                    description: result.body,
                    completed: completed[index],
                    priority: priority[index]
                });
            });
            this.props.updateTasks(tasks);
        });
    };

}

const mapStateToProps = (state) => {
    return {
        taskState: state.taskState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTasks: (tasks) => dispatch({ type: 'updateTasks', value: tasks }),
        toggleTodoHandler: (value) => dispatch({ type: 'toggleTodoHandler', value: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);