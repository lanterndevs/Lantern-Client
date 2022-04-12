import { Button } from '@mui/material';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { RootState } from 'src/redux/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCashflowMode
} from 'src/redux/modules/dashboard';

const ChartHeader = () => {
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();
    
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ToggleButtonGroup
      value={dashboardState.cashflow_mode}
      exclusive
      onChange={(e,v) => {dispatch(setCashflowMode(v))}}>
        <ToggleButton value="week" size='medium'>
          Week
        </ToggleButton>
        <ToggleButton value="month" size='medium'>
          Month
        </ToggleButton>
        <ToggleButton value="year" size='medium'>
          Year
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
    </div>
  );
};

export default React.memo(ChartHeader);
