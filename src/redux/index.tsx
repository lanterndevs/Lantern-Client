import { combineReducers } from 'redux';
import { transactionReducer } from './modules/transactions';

export const rootReducer = combineReducers({
  transactions: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;