import React, {Component} from 'react';
import {render} from 'react-dom';

import Perf from 'react-addons-perf';
import Clock from './perf/Clock';

class App extends Component {
	constructor() {
		super(...arguments);
		this.state = this.getTime();
	}

	componentDidMount() {
		setInterval(() => {
			this.setState(this.getTime);
		}, 10);
	}

	getTime() {
		let now = new Date();

		return {
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds(),
			tenths: parseInt(now.getMilliseconds() / 10)
		};
	}

	render() {
		let clocks = [];
		for(var i=0; i<200; i++) {
			clocks.push(<Clock hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} tenths={this.state.tenths} />);
		}

		return (
			<div>
				{clocks}
			</div>
		);
	}
}

Perf.start();
render(<App />, document.getElementById('content'));

window.setTimeout(() => {
	Perf.stop();

	Perf.printInclusive();
	Perf.printWasted();
}, 2000);
