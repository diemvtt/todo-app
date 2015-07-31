import React from 'react';
import connectToStore from 'alt/utils/connectToStores';

import TodoItem from './todoItem';

import TodoStore from '../store';
import TodoActions from '../actions';
import _ from 'underscore';

const ALL = 1;
const ACTIVE = 2;
const COMPLETED = 3;

@connectToStore
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ALL
        }
    }

    static getStores() {
        return [TodoStore];
    }

    static getPropsFromStores() {
        return TodoStore.getState();
    }


    componentDidMount() {
        TodoActions.load();
    }
    handleChange(){
        let ckall = React.findDOMNode(this.refs.checkall).checked;
        TodoActions.toggleDone(this.props.todos, ckall);

    }
    setFilter(filter){
        //TodoActions.unDone(this.props.todos);
        this.setState({filter: filter});
    }
    handleSubmit(e){

        TodoActions.isDone(this.props.todos);

    }

    render() {
        let todoItems = [];
        if (this.state.filter === ALL) {
            todoItems = this.props.todos.map(todo => <TodoItem key={todo.id} todo={todo} />);
        } else if (this.state.filter === ACTIVE) {
            todoItems = this.props.todos.filter(todo => todo.status === false).map(todo => <TodoItem key={todo.id} todo={todo} />);
        } else {
            todoItems = this.props.todos.filter(todo => todo.status === true).map(todo => <TodoItem key={todo.id} todo={todo} />);
        }
        return (
            <div className="main">
                { this.props.todos.length >0 ?
                    <input className="toggle-all" type="checkbox" checked={this.props.isCheckedAll} ref="checkall"
                           onChange={this.handleChange.bind(this)}/>
                    : <div></div>
                }
                <ul className="todoList">

                {todoItems}
            </ul>
                {this.props.todos.length > 0 ?
            <div className="footer">
                <span className="todo-count">{todoItems.length} item(s) left</span>

                <ul className="filter">
                    <li><a href="#" onClick={this.setFilter.bind(this, ALL)} >All</a></li>
                    <li><a href="#" onClick={this.setFilter.bind(this, ACTIVE)}>Active</a></li>
                    <li><a href="#" onClick={this.setFilter.bind(this, COMPLETED)}>Completed</a></li>
                    <button onClick={this.handleSubmit.bind(this)} className="clear-completed">Clear completed</button>

                </ul>
            </div>
                : <div></div>}
                </div>
        );
    }

}

export default TodoList;