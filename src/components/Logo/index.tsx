import { Box, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import mainLogo from './lantern.png';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {

  return (
    <LogoWrapper to="/overview">
      <LogoSignWrapper>
        <img src={mainLogo} style={{width: "170px", height: "80px", bottom:"25px", left: "-43px", position: "relative"}} alt="lantern-logo"/>
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoTextWrapper>
          <LogoText style={{ bottom: '-9px', left: "33px", position: "relative", fontSize: 20 }} >Lantern</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
