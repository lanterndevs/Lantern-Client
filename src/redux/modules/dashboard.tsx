export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

type DashboardLayout = {
    lg: DashboardItemPos[]
}

type DashboardItemPos = {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isResizable: boolean
}

type DashboardState = {
  layouts: DashboardLayout | null;
  cashflow_mode: string;
};

const initialState: DashboardState = { layouts: {lg:[
    { i: "a", x: 0, y: 0, w: 2, h: 4, isResizable:false},
    { i: "b", x: 2, y: 0, w: 1, h: 2, isResizable:false},
    { i: "c", x: 2, y: 2, w: 1, h: 2, isResizable:false},
    { i: "d", x: 0, y: 4, w: 1, h: 2, isResizable:false},
    { i: "e", x: 2, y: 4, w: 1, h: 2, isResizable:false},
  ]}, cashflow_mode: "month"};

export const saveLayouts = (layouts: DashboardLayout) => {
  return typedAction('saveLayouts', layouts);
};

export const setCashflowMode = (cashflow_mode: string) => {
  return typedAction('setCashflowMode', cashflow_mode);
};


type DashboardAction = ReturnType<
  typeof saveLayouts | typeof setCashflowMode
>;

export function dashboardReducer(
  state = initialState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case 'saveLayouts':
      return { layouts: action.payload, cashflow_mode: state.cashflow_mode};
    case 'setCashflowMode':
      return { layouts: state.layouts, cashflow_mode: action.payload};
    default:
      return state;
  }
}
