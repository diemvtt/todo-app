import React from 'react';
import TodoApp from './todoApp';
import alt from '../alt';
import Iso from 'iso';

let iso = new Iso();

alt.bootstrap(JSON.stringify({
    TodoStore: {
        todos: window.todos,
        isCheckedAll: false
    }
}));
//
let markup = React.renderToString(<TodoApp />);
let state = alt.flush();
iso.add(markup, state);

export default iso.render();
