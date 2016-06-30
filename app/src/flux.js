import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';

import BankBalanceStore from './flux/BankBalanceStore';
import BankRewardsStore from './flux/BankRewardsStore';
import BankActions from './flux/BankActions';

class App extends Component {
	constructor() {
		super(...arguments);
		BankActions.createAccount();

		/*
		this.state = {
			balance: BankBalanceStore.getState()
		};
		*/
	}
	/*
	componentDidMount() {
		this.storeSubscription = BankBalanceStore.addListener( data => this.handleStoreChange(data) );
	}

	componentWillUnmount() {
		this.storeSubscription.remove();
	}

	handleStoreChange() {
		this.setState( {balance: BankBalanceStore.getState()} );
	}
	*/

	deposit() {
		BankActions.depositIntoAccount(Number(this.refs.amount.value));
		this.refs.amount.value = '';
	}

	withdraw() {
		BankActions.withdrawFromAccount(Number(this.refs.amount.value));
		this.refs.amount.value = '';
	}

	render() {
		return (
			<div>
				<header>FluxTrust Bank</header>
				<h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
				<h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
				<div className="atm">
					<input type="text" placeholder="Enter Amount" ref="amount" />
					<br />
					<button onClick={this.withdraw.bind(this)}>withdraw</button>
					<button onClick={this.deposit.bind(this)}>deposit</button>
				</div>
			</div>
		);
	}
}

App.getStores = () => ([BankBalanceStore, BankRewardsStore]);
App.calculateState = (prevState) => ({
	balance: BankBalanceStore.getState(),
	rewardsTier: BankRewardsStore.getState()
});

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('content'));