import { combineReducers } from 'redux';
import { transactionReducer } from './modules/transactions';
import { dashboardReducer } from './modules/dashboard';

export const rootReducer = combineReducers({
  transactions: transactionReducer,
  dashboard: dashboardReducer
});

export type RootState = ReturnType<typeof rootReducer>;
