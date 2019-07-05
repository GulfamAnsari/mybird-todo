import React from 'react';
import './AddTask.css';

export default function AddTask({ openNewTodo, toggleTodoHandler}) {

    function onSubmitHandler(event) {
        console.log(event);
    }

    return (
        <main role="main" className={ openNewTodo ? 'main-wrap' : 'hidden'}>
            <header role="heading" className="header">
                <h1 className="app-header"> Add your task <span className="close-add-task" onClick={() => { toggleTodoHandler(false) }}>X</span></h1>
            </header>
            <section className="main-content">
                <section className="todo-form">
                    <form role="form" id="todoForm" onSubmit={onSubmitHandler}>
                        <div className="row">
                            <label htmlFor="title"> Title </label>
                            <input className="form-input" id="title" type="text" placeholder="Learn JavaScript" />
                        </div>
                        <div className="row">
                            <label htmlFor="description"> Description </label>
                            <textarea id="description" rows="4" cols="30" placeholder="Coz you already know Java"></textarea>
                        </div>
                        <div className="row">
                            <label htmlFor="priority"> Priority </label>
                            <select id="priority">
                                <option value="high">High</option>
                                <option value="med">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="row submit-btn">
                            <input type="submit" className="primary-button" value="DO IT" />
                        </div>
                    </form>
                </section>
            </section>
        </main>
    )
}
