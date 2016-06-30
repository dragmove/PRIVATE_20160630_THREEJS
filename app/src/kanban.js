import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './kanban/KanbanBoardContainer';

(function($) {
    "use strict";

    $(document).ready(init);

    function init() {
        console.log('init');

        ReactDOM.render(
            <KanbanBoardContainer />,
            $('#content').get(0)
        );
    }

    /*
    let KanbanBoard = require('./kanban/KanbanBoard');

    let cardsList = [
        {
            id: 1,
            title: 'title-11',
            description: 'I shoud read the book 1.',
            status: 'in-progress',
            tasks: []
        },
        {
            id: 2,
            title: 'title-2',
            description: 'I shoud read the book 2.',
            status: 'todo',
            tasks: [{
                id: 1,
                name: 'ContactList Example',
                done: true
            }, {
                id: 2,
                name: 'Kanban Example',
                done: false
            }, {
                id: 3,
                name: 'My own experiments',
                done: false
            }]
        }
    ];

    $(document).ready(init);

    function init() {
        console.log('init');

        ReactDOM.render(
            <KanbanBoard cards={cardsList} />,
            $('#content').get(0)
        );
    }
    */
}(jQuery));
