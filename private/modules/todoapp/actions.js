import alt from './alt';
import SuperAgent from 'superagent'
import _ from 'underscore';

class TodoActions {
    constructor() {
        this.generateActions(
            'loadCompleted',
            'updateCompleted',
            'deleteCompleted',
            'createCompleted',
            'updateCompleted',
            'toggleDoneCompleted',
            'isDoneCompleted'
        );
    }

    load() {
        SuperAgent
            .get('/todoList')
            .accept('json')
            .end((err, res) => {
                if (!err) {
                    this.actions.loadCompleted(res.body);
                }
            });
    }

    update(todo) {
        SuperAgent
            .post('/todos/edit')
            .send(todo)
            .end((err, res)=> {
                if (!err) {
                    this.actions.updateCompleted(todo);
                }
            });
    }


    delete(index) {
        SuperAgent
            .del(`/todos/${index}`)
            .end((err, res) => {
                if (!err) {
                    this.actions.deleteCompleted(index);
                }
            });
    }

    create(todo) {
        SuperAgent
            .post('/todos/new')
            .send(todo)
            .end((err, res) => {
                if (!err) {
                    todo.id = res.body;
                    this.actions.createCompleted(todo);
                }
            });
    }

    toggleDone(todos, allDone) {
        let callMeWhenAllIsDone = _.after(todos.length, () => this.actions.toggleDoneCompleted(allDone));
        todos.forEach(todo => {
            todo.status = allDone;
            SuperAgent
                .post('/todos/edit')
                .send(todo)
                .end((err, res) => {
                    if (!err) {
                        callMeWhenAllIsDone();
                    }
                })
        });

    }

    isDone(todos){
        todos.filter(todo => todo.status === true).forEach(todo => {

                SuperAgent
                    .del(`/todos/${todo.id}`)
                    .end((err, res) => {
                        if (!err) {
                            this.actions.isDoneCompleted(todos);
                        }
                    });

        });
    }


}

export default alt.createActions(TodoActions);