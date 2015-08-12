import React from 'react';
import TodoApp from './todoApp';
import alt from '../alt';
import Iso from 'iso';

Iso.bootstrap((state, meta, node)=>{
    alt.bootstrap(state);
    React.render(<TodoApp />, node)
});