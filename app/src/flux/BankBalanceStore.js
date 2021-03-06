/*
import {EventEmitter} from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

const CHANGE_EVENT = 'change';

let __emitter = new EventEmitter();
console.log('__emitter :', __emitter);

let balance = 0;

let BankBalanceStore = {
	getState() {
		return balance;
	},

	addListener: (callback) => {
		return __emitter.addListener(CHANGE_EVENT, callback);
	}
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
	switch(action.type) {
		case bankConstants.CREATED_ACCOUNT :
			balance = 0;
			__emitter.emit(CHANGE_EVENT);
			break;

		case bankConstants.DEPOSITED_INFO_ACCOUNT :
			balance = balance + action.amount;
			console.log('balance :', balance);

			__emitter.emit(CHANGE_EVENT);
			break;

		case bankConstants.WITHDREW_FROM_ACCOUNT :
			balance = balance - action.amount;
			console.log('balance :', balance);

			__emitter.emit(CHANGE_EVENT);
			break;
	}
});

export default BankBalanceStore;
*/

/*
import AppDispatcher from './AppDispatcher';
import {Store} from 'flux/utils';
import bankConstants from './constants';

let balance = 0;

class BankBalanceStore extends Store {
	getState() {
		return balance;
	}

	__onDispatch(action) {
		switch(action.type) {
			case bankConstants.CREATED_ACCOUNT :
				balance = 0;
				this.__emitChange();
				break;

			case bankConstants.DEPOSITED_INFO_ACCOUNT :
				balance = balance + action.amount;
				this.__emitChange();
				break;

			case bankConstants.WITHDREW_FROM_ACCOUNT :
				balance = balance - action.amount;
				this.__emitChange();
				break;
		}
	}
}

export default new BankBalanceStore(AppDispatcher);
*/

import AppDispatcher from './AppDispatcher';
import {ReduceStore} from 'flux/utils';
import bankConstants from './constants';

class BankBalanceStore extends ReduceStore {
	getInitialState() {
		return 0;
	}

	reduce(state, action) {
		switch(action.type) {
			case bankConstants.CREATED_ACCOUNT :
				return 0;
				break;
		
			case bankConstants.DEPOSITED_INFO_ACCOUNT :
				return state + action.amount;
				break;

			case bankConstants.WITHDREW_FROM_ACCOUNT :
				return state - action.amount;
				break;

			default :
				return state;
		}
	}
}

export default new BankBalanceStore(AppDispatcher);