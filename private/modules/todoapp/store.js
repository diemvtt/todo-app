import alt from './alt';
import actions from './actions';
import _ from 'underscore';

class TodoStore {
    constructor(){
        this.bindListeners({
            loadCompleted: actions.loadCompleted,
            deleteCompleted: actions.deleteCompleted,
            createCompleted: actions.createCompleted,
            updateCompleted: actions.updateCompleted,
            toggleDoneCompleted : actions.toggleDoneCompleted,
            isDoneCompleted : actions.isDoneCompleted,
            //unDoneCompleted: actions.unDoneCompleted
        });

        this.state = {
            todos: [],
            //todoStorage: [],
            isCheckedAll: false
        }
    }

    loadCompleted(todos) {
        let isAllDone = _.reduce(todos, (memo, todo) => {
            return memo && todo.status
        }, true );
        if(this.state.todos.length == 0){
            isAllDone = false;
        }
        //this.setState({todos: todos, isCheckedAll: isAllDone, todoStorage: todos});
        this.setState({todos: todos, isCheckedAll: isAllDone});
    }

    deleteCompleted(index) {

        this.state.todos = this.state.todos.filter(todo => todo.id != index);
        if(this.state.todos.length == 0){
            this.state.isCheckedAll = false;
        }
    }

    createCompleted(todo){
        this.state.todos.push(todo);
    }

    updateCompleted(todo){
        //let newIsAllChecked = this.state.isCheckedAll && !!todo.status;
        let index = _.findIndex(this.state.todos, (item)=> item.id == todo.id);
        let todos = this.state.todos;
        todos[index] = todo;

        let newIsAllChecked = _.reduce(todos, (memo, todo) => { return memo && todo.status },true);
        this.setState({todos: todos, isCheckedAll: newIsAllChecked});
    }

    toggleDoneCompleted(allDone){
        let todos = this.state.todos;
        todos.forEach(todo => todo.status = allDone);
        this.setState({todos: todos, isCheckedAll: allDone});
    }
    isDoneCompleted(){
        //let todos = this.state.todos;
        //todos.forEach(todo => {
        //    if(todo.status == true)
        //        this.deleteCompleted(todo.id);
        //});
        let todos = this.state.todos.filter(todo => todo.status === false);
        this.setState({isCheckedAll: false, todos: todos});
    }
    //isDoneCompleted(){
    //    let done = _.filter(this.state.todoStorage, (todo) => todo.status == true);
    //    this.state.todos = done;
    //}
    //unDoneCompleted(){
    //    let undone = _.filter(this.state.todoStorage, (todo) => todo.status == false);
    //    this.state.todos = undone;
    //}
}

export default alt.createStore(TodoStore, 'TodoStore');