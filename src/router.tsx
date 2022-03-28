import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { getCookie } from './utils/cookies';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Login = Loader(lazy(() => import('src/content/applications/Login')));
const Signup = Loader(lazy(() => import('src/content/applications/Signup')));

// Dashboard
const Overview = Loader(lazy(() => import('src/content/dashboard/Overview')));

// Applications
const FinancialAccounts = Loader(
  lazy(() => import('src/content/applications/FinancialAccounts'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
// *** Will need to add Goals, Budget, etc

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
); // *** Won't need this ***
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
); // *** Won't need this ***
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
); // *** Won't need this ***

// Components
const Reports = Loader(
  lazy(() => import('src/content/pages/Components/Reports'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

function PrivateComponent({ component: Component, ...rest }) {
  const loggedIn = getCookie(document.cookie, 'auth_token') != null;
  return loggedIn ? <Component /> : <Navigate to={{ pathname: '/login' }} />;
}

function SignedOutOnlyComponent({ component: Component, ...rest }) {
  const loggedOut = getCookie(document.cookie, 'auth_token') == null;
  return loggedOut ? <Component /> : <Navigate to={{ pathname: '/' }} />;
}

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard/overview" replace />
      },
      {
        path: 'overview',
        element: <Navigate to="/dashboard/overview" replace />
      },

      {
        path: 'login',
        element: <SignedOutOnlyComponent component={Login} />
      },

      {
        path: 'register',
        element: <SignedOutOnlyComponent component={Signup} />
      },

      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateComponent component={SidebarLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard/overview" replace />
      },
      {
        path: 'overview',
        element: <Overview />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'banking',
    element: <PrivateComponent component={SidebarLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/banking/transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'financialaccounts',
        element: <FinancialAccounts />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: 'finances',
    element: <PrivateComponent component={SidebarLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/finances/reports" replace />
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'budget',
        element: <Navigate to="/status/coming-soon" replace />
      },
      {
        path: 'goals',
        element: <Navigate to="/status/coming-soon" replace />
      }
    ]
  },

  {
    path: 'tools',
    element: <PrivateComponent component={SidebarLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/tools/calculators" replace />
      },

      {
        path: 'calculators',
        element: <Navigate to="/status/coming-soon" replace />
      },
      {
        path: 'calendar',
        element: <Navigate to="/status/coming-soon" replace />
      }
    ]
  }
];

export default routes;
