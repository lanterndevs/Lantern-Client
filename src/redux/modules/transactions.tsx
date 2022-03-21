export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

type TransactionState =  {
    transactions : Object[] | null;
}

const initialState: TransactionState = { transactions: [] };

export const saveTransactions = (transactions: Object[]) => {
    return typedAction('saveTransactions',transactions);
};

type TransactionAction = ReturnType<typeof saveTransactions>;

export function transactionReducer(
  state = initialState,
  action: TransactionAction
): TransactionState {
  switch (action.type) {
    case 'saveTransactions':
      return { transactions: action.payload };
    default:
      return state;
  }
}