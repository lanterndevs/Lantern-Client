import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { CookiesProvider } from 'react-cookie';
import { withCookies } from 'react-cookie';

const App = () => {

  const content = useRoutes(routes);

  return (
    <CookiesProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}
export default withCookies(App);
