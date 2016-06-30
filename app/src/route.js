import React, { Component } from 'react';
import { render } from 'react-dom';

import About from './route/About';
import Home from './route/Home';
import Repos from './route/Repos';

(function($) {
	"use strict";

	class App extends Component {
		constructor() {
			super(...arguments);

			this.state = {
				route: window.location.hash.substr(1)
			};
		}

		componentDidMount() {
			$(window).on('hashchange', () => {
				console.log('this.state :', this.state);

				this.setState({
					route: window.location.hash.substr(1)
				});
			});
		}

		render() {
			var Child;

			switch( this.state.route ) {
				case '/about' :
					Child = About;
					break;

				case '/repos' :
					Child = Repos;
					break;

				default :
					Child = Home;
			}

			return (
				<div>
					<header>App</header>
					<menu>
						<ul>
							<li><a href="#/about">About</a></li>
							<li><a href="#/repos">Repos</a></li>
						</ul>
					</menu>
					<Child />
				</div>
			);
		}
	}
  
	$(document).ready(init);

	function init() {
		render( <App />, $('#content').get(0) );
	}
}(jQuery));
