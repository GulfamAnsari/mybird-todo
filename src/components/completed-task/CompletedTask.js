import React, { Component } from 'react'

export default class CompletedTask extends Component {

    render() {
        const { completedTask, removeCompletedTaskHandler } = this.props;
        return (
            <li className={"todo-item " + completedTask.priority.toLowerCase()}>
                <div className="icon-check">
                    <i className="pad-15 material-icons md-36 md-light" onClick={() => { removeCompletedTaskHandler(completedTask.key) }}>check_circle</i>
                </div>

                <div className="icon-delete">
                    <i className="pad-15 material-icons md-36 md-light" onClick={() => { removeCompletedTaskHandler(completedTask.key) }}>delete</i>
                </div>
                <div className="content">
                    {completedTask.title}
                </div>
            </li>
        )
    }
}
