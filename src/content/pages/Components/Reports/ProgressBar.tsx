import { Typography } from '@mui/material';
import { useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {' '}
      </div>

      <div style={{ left: '200px', bottom: '27px', position: 'relative' }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.secondary"
          gutterBottom
          noWrap
        >
          {done}%
        </Typography>
      </div>
    </div>
  );
};

export default ProgressBar;
