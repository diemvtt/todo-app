import React from 'react';

import TodoStore from '../store';
import TodoActions from '../actions';
import TodoList from './todoList';
import TodoItem from './todoItem';

class NewTodoForm extends React.Component {
    constructor() {
        super();
    }

    handleSubmit(e) {
        e.preventDefault();
        let todo = {
            description: React.findDOMNode(this.refs.newTodo).value,
            status: false
        };

        TodoActions.create(todo);

        React.findDOMNode(this.refs.newTodo).value = '';
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <input className="todo-input" name="addDes" placeholder="What need to be done?" type="text"  ref='newTodo' />
            </form>
                </div>
        );

    }
}

export default NewTodoForm;