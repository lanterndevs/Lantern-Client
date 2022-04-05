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
  total_transactions: Number;
  loading: boolean;
  timestamp: Number;
};

const initialState: TransactionState = {
  transactions: [],
  total_transactions: 0,
  loading: true,
  timestamp: Date.now()
};

export const saveTransactions = (transactions: Transaction[]) => {
  return typedAction('saveTransactions', transactions);
};

export const saveTotalTransactions = (total_transactions: Number) => {
  return typedAction('saveTotalTransactions', total_transactions);
};

export const setTransactionLoading = (loading: boolean) => {
  return typedAction('setTransactionLoading', loading);
};

export const setTransactionTimestamp = (timestamp: Number) => {
  return typedAction('setTransactionTimestamp', timestamp);
};

type TransactionAction = ReturnType<
  | typeof saveTransactions
  | typeof saveTotalTransactions
  | typeof setTransactionLoading
  | typeof setTransactionTimestamp
>;

export function transactionReducer(
  state = initialState,
  action: TransactionAction
): TransactionState {
  switch (action.type) {
    case 'saveTransactions':
      return {
        transactions: action.payload,
        total_transactions: state.total_transactions,
        loading: state.loading,
        timestamp: state.timestamp
      };
    case 'saveTotalTransactions':
      return {
        transactions: state.transactions,
        total_transactions: action.payload,
        loading: state.loading,
        timestamp: state.timestamp
      };
    case 'setTransactionLoading':
      return {
        transactions: state.transactions,
        total_transactions: state.total_transactions,
        loading: action.payload,
        timestamp: state.timestamp
      };
    case 'setTransactionTimestamp':
      return {
        transactions: state.transactions,
        total_transactions: state.total_transactions,
        loading: state.loading,
        timestamp: action.payload
      };
    default:
      return state;
  }
}
