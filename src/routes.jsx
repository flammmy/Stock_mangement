import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

import ProtectedRoute from './views/auth/ProtectedRoute';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.allowedRoles ? (
                    <ProtectedRoute allowedRoles={route.allowedRoles}>
                      {route.routes ? renderRoutes(route.routes) : <Element />}
                    </ProtectedRoute>
                  ) : (
                    route.routes ? renderRoutes(route.routes) : <Element />
                  )}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  // {
  //   exact: 'true',
  //   path: '/auth/signin-1',
  //   element: lazy(() => import('./views/auth/signin/SignIn1'))
  // },
  // {
  //   exact: 'true',
  //   path: '/auth/signup-1',
  //   element: lazy(() => import('./views/auth/signup/SignUp1'))
  // },

  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard')),
        allowedRoles : [1,2,3]
      },
      {
        exact: 'true',
        path: '/users',
        element: lazy(() => import('./views/users/Index')),
        allowedRoles:[1,2,3]

      },
      {
        exact: 'true',
        path: '/add-user',
        element: lazy(() => import('./views/users/AddUser')),
        allowedRoles:[1,2,3]
      }, {
        exact: 'true',
        path: '/Supplier',
        element: lazy(() => import('./views/supplier/Index')),
        allowedRoles:[1,2,3]
      },{
        exact: 'true',
        path: '/add-Supplier',
        element: lazy(() => import('./views/supplier/AddSupplier')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/receiver',
        element: lazy(() => import('./views/receiver/Index')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/add-Receiver',
        element: lazy(() => import('./views/receiver/AddReceiver')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/bank',
        element: lazy(() => import('./views/bank/Index')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/add-Bank',
        element: lazy(() => import('./views/bank/AddBank')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/products',
        element: lazy(() => import('./views/products/Index')),
        allowedRoles:[1,2,3]

      },{
        exact: 'true',
        path: '/Add-Product',
        element: lazy(() => import('./views/products/AddProduct')),
        allowedRoles:[1,2,3]

      },
      {
        exact: 'true',
        path: '/stocks',
        element: lazy(() => import('./views/stock/Index')),
        allowedRoles:[1,2,3]
      },
      {
        exact: 'true',
        path: '/add-invoice',
        element: lazy(() => import('./views/stock/Add_inoice')),
        allowedRoles:[1,2,3]
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges')),
        
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;