
import React, { Component } from 'react';
import 'whatwg-fetch';

(function($) {
    "use strict";

    const React = require('react'),
        ReactDOM = require('react-dom');

    $(document).ready(init);

    function init() {
        /*
        let contacts = [
            { name: 'Cassio Zen 1', email: 'cassiozen1@gmail.com' },
            { name: 'Cassio Zen 2', email: 'cassiozen2@gmail.com' },
            { name: 'Cassio Zen 3', email: 'cassiozen3@gmail.com' },
            { name: 'Cassio Zen 4', email: 'cassiozen4@gmail.com' },
            { name: 'Cassio Zen 5', email: 'cassiozen5@gmail.com' },
            { name: 'Cassio Zen 6', email: 'cassiozen6@gmail.com' }
        ];
        */

        var ContactsApp = React.createClass({
            handleUserInput(searchTerm) {
                this.setState({
                    filterText: searchTerm
                });
            },

            getInitialState: function() {
                return {
                    filterText: ''
                };
            },
            componentWillMount: function() {
            },

            render: function() {
                return (
                    <div>
                        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                        <ContactList contacts={this.props.contacts} filterText={this.state.filterText} />
                    </div>
                );
            },

            componentDidMount: function() {
            },
            componentWillUpdate: function(nextProps, nextState) {
            },
            componentDidUpdate: function(prevProps, prevState) {
            },
            componentWillUnmount: function() {
            }
        });

        var SearchBar = React.createClass({
            handleChange(evt) {
                this.props.onUserInput(evt.target.value);
            },

            render: function() {
                return (
                    <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange} />
                );
            }
        });
        SearchBar.propTypes = {
            onUserInput: React.PropTypes.func.isRequired,
            filterText: React.PropTypes.string.isRequired
        };

        var ContactList = React.createClass({
            render: function() {
                let filteredContacts = this.props.contacts.filter(
                    (contact) => contact.name.indexOf(this.props.filterText) !== -1
                );

                return (
                    <ul>
                        {filteredContacts.map( 
                            (contact) => <ContactItem key={contact.email} name={contact.name} email={contact.email} />
                        )}
                    </ul>
                );
            }
        });
        ContactList.propTypes = {
            contacts: React.PropTypes.arrayOf(React.PropTypes.object)
        };

        var ContactItem = React.createClass({
            render: function() {
                return (
                    <li>{this.props.name} - {this.props.email}</li>
                );
            }
        });
        ContactItem.propTypes = {
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired
        };

        class ContactsAppContainer extends Component {
            constructor() {
                super();

                this.state = {
                    contacts: []
                };
            }

            componentDidMount() {
                fetch('./data/contacts.json')
                .then( (response) => response.json() )
                .then( (responseData) => {
                    this.setState({
                        contacts: responseData
                    });
                })
                .catch( (error) => {
                    console.log('Error fetching and parsing data', error);
                });
            }

            render() {
                return (
                    <ContactsApp contacts={this.state.contacts} />
                );
            }
        }

        ReactDOM.render(
            <ContactsAppContainer />,
            $('#content').get(0)
        );
    }
}(jQuery));