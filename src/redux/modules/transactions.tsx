export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

type Transaction = {
  transactionID: string;
  accountID: string;
  amount: number;
  categories: string;
  date: Date;
  details: string;
  name: string;
  currency: string;
};

type TransactionState = {
  transactions: Transaction[] | null;
  loading: boolean;
  timestamp: Number;
};

const initialState: TransactionState = { transactions: [], loading: true, timestamp: Date.now()};

export const saveTransactions = (transactions: Transaction[]) => {
  return typedAction('saveTransactions', transactions);
};

export const setTransactionLoading = (loading: boolean) => {
  return typedAction('setTransactionLoading', loading);
};

export const setTransactionTimestamp = (timestamp: Number) => {
  return typedAction('setTransactionTimestamp', timestamp);
};

type TransactionAction = ReturnType<
  typeof saveTransactions | typeof setTransactionLoading | typeof setTransactionTimestamp
>;

export function transactionReducer(
  state = initialState,
  action: TransactionAction
): TransactionState {
  switch (action.type) {
    case 'saveTransactions':
      return { transactions: action.payload, loading: state.loading, timestamp: state.timestamp};
    case 'setTransactionLoading':
      return { transactions: state.transactions, loading: action.payload, timestamp: state.timestamp };
    case 'setTransactionTimestamp':
      return { transactions: state.transactions, loading: state.loading, timestamp: action.payload };
    default:
      return state;
  }
}
