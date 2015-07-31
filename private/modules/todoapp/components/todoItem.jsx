import React from 'react';

import TodoActions from '../actions';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edited: false,
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let todo = {
            id: this.props.todo.id,
            description: React.findDOMNode(this.refs.todoitem).value,
            status: this.props.todo.status
        };
        if (todo.description === '') {
            TodoActions.delete(todo.id);
        }
        else {
            TodoActions.update(todo);
        }
        this.setState({
            edited: false,
        });


    }

    onChange() {
        let todo = {
            id: this.props.todo.id,
            status: React.findDOMNode(this.refs.todocheck).checked,
            description: this.props.todo.description
        };

        TodoActions.update(todo);
    }


    render() {
        //const {value,onEdit,...props} = this.props;
        var edited = this.state.edited;
        return (
            <li className="todo-item">


                {
                    edited ?
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input className="edit-item" type='text' defaultValue={this.props.todo.description}
                                   ref="todoitem"
                                /></form>
                        :
                        <div className="view">
                            <input type='checkbox' class="toggle" checked={this.props.todo.status}
                                   onChange={this.onChange.bind(this)} ref="todocheck"/>
                            { this.props.todo.status ?
                                <span className="completed"
                                      onClick={() => this.edit()}> {this.props.todo.description}</span>
                                :
                                <span className="active"
                                      onClick={() => this.edit()}> {this.props.todo.description}</span>}

                            <a href="#" onClick={TodoActions.delete.bind(null, this.props.todo.id)} className="delete">x</a>
                        </div>
                }</li>


        );
    }

    edit() {
        this.setState({
            edited: true,
        });
    }


}
export default TodoItem;