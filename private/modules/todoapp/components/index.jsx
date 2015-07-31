import React from 'react';
import NewTodoForm from './newTodoForm';
import TodoList from './todoList';
import TodoItem from './todoItem';

class TodoApp extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                <NewTodoForm />
                <TodoList />
            </div>
        );
    }
}

React.render(<TodoApp />, document.getElementById('todoapp'));
