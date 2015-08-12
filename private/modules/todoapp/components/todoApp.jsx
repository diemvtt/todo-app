import React from 'react';
import NewTodoForm from './newTodoForm';
import TodoList from './todoList';
import TodoItem from './todoItem';

class TodoApp extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                <NewTodoForm />
                <TodoList/>
            </div>
        );
    }
}

export default TodoApp;
