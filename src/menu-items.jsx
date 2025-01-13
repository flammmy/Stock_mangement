const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Home',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        }
      ]
    },


    {
      id: '',
      title: 'Users',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'Users',
          title: 'People',
          type: 'collapse',
          icon: 'feather icon-users',
          children: [
            {
              id: 'users',
              title: 'Users',
              icon: 'feather icon-user',
              type: 'item',
              url: '/users'
            }, {
              id: 'suppliers',
              title: 'Suppliers',
              icon: 'feather icon-share-2',
              type: 'item',
              url: '/supplier'
            },
            {
              id: 'Purchaser',
              title: 'Purchaser',
              icon: 'feather icon-users',
              type: 'item',
              url: '/receiver'
            },
            {
              id: 'customers',
              title: 'Customers',
              icon: 'feather icon-user-check',
              type: 'item',
              url: '/customers'
            },{
              id: 'Products',
              title: 'Products',
              icon: 'feather icon-package',
              type: 'item',
              url: '/shades'
            }
            ,{
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/basic/breadcrumb-paging'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },

    {
      id: 'stockin',
      title: 'Stock In',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'stocks',
          title: 'Stocks In',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'list_stock',
              title: 'List',
              icon: 'feather icon-list',
              type: 'item',
              url: '/invoices'
            },
            {
              id: 'add_invoice',
              title: 'Add Invoice',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/add-invoice'
            }, {
              id: 'all_stocks',
              title: 'Purchase Stocks',
              icon: 'feather icon-clipboard',
              type: 'item',
              url: '/all-stocks'
            },
            {
              id: 'old_stock',
              title: 'Old Stock',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stocks/add-radius'
            },
            {
              id: 'all_old_stock',
              title: 'All Old Stock',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: 'stocks/old-stock'
            },
            {
              id: 'Available_stocks',
              title: 'Available Stocks',
              icon: 'feather icon-clipboard',
              type: 'item',
              url: '/available-stocks'
            }
          ]
        }
      ]
    },
    {
      id: 'stockout',
      title: 'Stock Out',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'stocksout',
          title: 'Stocks Out',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [

            {
              id: 'invoice_out',
              title: 'Invoice',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/invoice-out'
            }, {
              id: 'invoice_out_index',
              title: 'All Out Invoice',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/all-invoices-out'
            }, {
              id: 'invoice_out_stock',
              title: 'All Out Stock',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/all-out-stock'
            },
            {
              id: 'stock_to_godown',
              title: 'Send To Godown',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/invoiceOut',
            }

          ]
        }
      ]
    },
    {
      id: 'GoDown',
      title: 'Go Down Out',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'send_to_godown',
          title: 'Stocks Out Godown',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [

            {
              id: 'invoice_out',
              title: 'GatePass',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stockout/godown'
            },
            {
              id: 'Approve_godown',
              title: 'Approve Godown',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/approve/godown'
            },
            {
              id: 'Godown_stock',
              title: 'Godown Stocks',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stocks/godown'
            }
          ]
        }
      ]
    },

    // {
    //   id: 'chart-maps',
    //   title: 'Chart & Maps',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Charts',
    //       type: 'item',
    //       icon: 'feather icon-pie-chart',
    //       url: '/charts/nvd3'
    //     },
    //     {
    //       id: 'maps',
    //       title: 'Maps',
    //       type: 'item',
    //       icon: 'feather icon-map',
    //       url: '/maps/google-map'
    //     }
    //   ]
    // },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       badge: {
    //         title: 'New',
    //         type: 'label-danger'
    //       },
    //       children: [
    //         {
    //           id: 'signup-1',
    //           title: 'Sign up',
    //           type: 'item',
    //           url: '/auth/signup-1',
    //           target: true,
    //           breadcrumbs: false
    //         },
    //         {
    //           id: 'signin-1',
    //           title: 'Sign in',
    //           type: 'item',
    //           url: '/auth/signin-1',
    //           target: true,
    //           breadcrumbs: false
    //         }
    //       ]
    //     },
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       icon: 'feather icon-book',
    //       classes: 'nav-item',
    //       url: 'https://codedthemes.gitbook.io/datta/',
    //       target: true,
    //       external: true
    //     },
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'feather icon-menu',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Menu Level 1.1',
    //           type: 'item',
    //           url: '#!'
    //         },
    //         {
    //           id: 'menu-level-1.2',
    //           title: 'Menu Level 2.2',
    //           type: 'collapse',
    //           children: [
    //             {
    //               id: 'menu-level-2.1',
    //               title: 'Menu Level 2.1',
    //               type: 'item',
    //               url: '#'
    //             },
    //             {
    //               id: 'menu-level-2.2',
    //               title: 'Menu Level 2.2',
    //               type: 'collapse',
    //               children: [
    //                 {
    //                   id: 'menu-level-3.1',
    //                   title: 'Menu Level 3.1',
    //                   type: 'item',
    //                   url: '#'
    //                 },
    //                 {
    //                   id: 'menu-level-3.2',
    //                   title: 'Menu Level 3.2',
    //                   type: 'item',
    //                   url: '#'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'feather icon-power'
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
