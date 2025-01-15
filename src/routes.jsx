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
                  {route.routes ? renderRoutes(route.routes) : <Element />}
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
  {
    exact: 'true',
    path: '/signin/forgotPassword',
    element: lazy(() => import('./views/auth/signin/forgotPassword'))
  },
  {
    exact: 'true',
    path: '/signin/resetPassword',
    element: lazy(() => import('./views/auth/signin/resetPassword'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/users',
        element: lazy(() => import('./views/users/Index')),
        allowedRoles: [1]
      },
      {
        exact: 'true',
        path: '/add-user',
        element: lazy(() => import('./views/users/AddUser')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/Supplier',
        element: lazy(() => import('./views/supplier/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-Supplier',
        element: lazy(() => import('./views/supplier/AddSupplier')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/receiver',
        element: lazy(() => import('./views/receiver/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-Receiver',
        element: lazy(() => import('./views/receiver/AddReceiver')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/customers',
        element: lazy(() => import('./views/customer/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-Customer',
        element: lazy(() => import('./views/customer/AddCustomer')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/products',
        element: lazy(() => import('./views/products/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/Add-Product',
        element: lazy(() => import('./views/products/AddProduct')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/stocks',
        element: lazy(() => import('./views/stock/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/available-stocks',
        element: lazy(() => import('./views/stock/Available_Stock')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-invoice',
        element: lazy(() => import('./views/stock/Add_inoice')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/invoices',
        element: lazy(() => import('./views/stock/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-product/:id/:no',
        element: lazy(() => import('./views/stock/Add_product')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/show-product/:id',
        element: lazy(() => import('./views/stock/Show_product')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/shades',
        element: lazy(() => import('./views/shades/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/add-shades',
        element: lazy(() => import('./views/shades/AddShade')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/all-stocks',
        element: lazy(() => import('./views/stock/All_Stock')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/invoice-out',
        element: lazy(() => import('./views/stockOut/Invoice_out')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/invoiceOut',
        element: lazy(() => import('./views/stockOut/stock_to_godown')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/all-invoices-out',
        element: lazy(() => import('./views/stockOut/Index')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/all-out-stock',
        element: lazy(() => import('./views/stockOut/all_out_stock')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/stocks/add-radius',
        element: lazy(() => import('./views/stock/Add_role')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/stocks/old-stock',
        element: lazy(() => import('./views/stock/Old_stock')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/stockout/godown',
        element: lazy(() => import('./views/godown/stock_send')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/approve/godown/',
        element: lazy(() => import('./views/godown/approve_godown')),
        allowedRoles: [1, 2, 3]
      },
      {
        exact: 'true',
        path: '/stocks/godown/',
        element: lazy(() => import('./views/godown/index')),
        allowedRoles:[1, 2, 3]
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
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
      },
      {
        exact: 'true',
        path: '/NavLeft/profile-page',
        element: lazy(() => import('./layouts/AdminLayout/NavBar/NavRight/profile-page'))
      },
      {
        exact: 'true',
        path: '/NavRight/changePassword',
        element: lazy(() => import('./layouts/AdminLayout/NavBar/NavRight/changePassword'))
      }
    ]
  }
];

export default routes;