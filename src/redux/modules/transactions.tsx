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
}

type TransactionState =  {
    transactions : Transaction[] | null;
}

const initialState: TransactionState = { transactions: [] };



export const saveTransactions = (transactions: Transaction[]) => {
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