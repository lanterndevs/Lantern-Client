import { Box, Hidden, Tooltip } from '@mui/material';
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

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
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
        {/* This is where the lantern image will go */}
        {/* <LogoSign>
          <LogoSignInner />
        </LogoSign> */}
        <img src={mainLogo} style={{width: "40px", height: "70px", bottom:"20px", left: "6px", position: "relative"}} alt="lantern-logo"/>
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoTextWrapper>
          {/* Need to remove this, apply CSS changes to center the lantern text */}
          <Tooltip title="Version 1.0.0" arrow placement="right">
            <VersionBadge>1.0</VersionBadge>
          </Tooltip>
          <LogoText>Lantern</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
