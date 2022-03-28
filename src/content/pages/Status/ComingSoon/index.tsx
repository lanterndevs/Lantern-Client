import { useEffect, useState } from 'react';
import { Box, Typography, Container, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

function StatusComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Box textAlign="center" px={3}>
        <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
        <TypographyH3 variant="h3">{interval}</TypographyH3>
      </Box>
    );
  });

  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/dashboard/overview';
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <title>Status - Coming Soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          {/* <Logo /> */}
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Coming Soon
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                This page is under construction.
              </Typography>
            </Container>
            <img
              alt="Coming Soon"
              height={200}
              src="/static/images/status/coming-soon.svg"
            />
          </Box>

          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Button variant="contained" size="large" onClick={routeChange}>
                Return Home
              </Button>

              <Divider sx={{ my: 4 }} />
            </Box>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;
