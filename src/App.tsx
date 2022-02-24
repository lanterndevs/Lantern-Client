import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { CookiesProvider } from 'react-cookie';
import { withCookies } from 'react-cookie';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const App = () => {

  const content = useRoutes(routes);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <CookiesProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
              {content}
          </LocalizationProvider>
        </ThemeProvider>
      </CookiesProvider>
    </AlertProvider>
  );
}
export default withCookies(App);
