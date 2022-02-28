import { Button } from '@mui/material'
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

const ChartHeader = ({ onClick}) => {
    return ( 
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom: '20px'}}>
        <ButtonGroup size="medium">
            <Button variant="outlined" onClick={onClick} name="week">Week</Button>
            <Button variant="outlined" onClick={onClick} name="month">Month</Button>
            <Button variant="outlined" onClick={onClick} name="year">Year</Button>
        </ButtonGroup> 
        <br/>
        </div>
    )
};

export default React.memo(ChartHeader);