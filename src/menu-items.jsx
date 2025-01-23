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
          url: '/dashboard',
          allowedRoles: ['admin','operator'],
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
              url: '/users',
              allowedRoles: ['admin','operator'],
            },{
              id: 'suppliers',
              title: 'Suppliers',
              icon: 'feather icon-share-2',
              type: 'item',
              url: '/supplier',
              allowedRoles: ['operator'],
            },
            {
              id: 'Purchaser',
              title: 'Purchaser',
              icon: 'feather icon-users',
              type: 'item',
              url: '/receiver'
            },
            
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
          children: [{
            id: 'Products',
            title: 'Products',
            icon: 'feather icon-package',
            type: 'item',
            url: '/shades'
          },{
            id: 'add_invoice',
            title: 'Add Invoice',
            icon: 'feather icon-file-plus',
            type: 'item',
            url: '/add-invoice'
          },
          {
            id: 'list_stock',
            title: 'List',
            icon: 'feather icon-list',
            type: 'item',
            url: '/invoices'
          },
          {
            id: 'all_stocks',
            title: 'Purchase Stocks',
            icon: 'feather icon-clipboard',
            type: 'item',
            url: '/all-stocks'
          },
          {
            id: 'Available_stocks',
            title: 'Available Stocks',
            icon: 'feather icon-clipboard',
            type: 'item',
            url: '/available-stocks'
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
            },,
            {
              id: 'approve_Stockout',
              title: 'Approve Rough Invoice',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stockout/godown/approve'
            }
          ]
        }
      ]
    }, ,
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
              id: 'customers',
              title: 'Customers',
              icon: 'feather icon-user-check',
              type: 'item',
              url: '/customers'
            }

          ]
        }
      ]
    }
  ]
};

export default menuItems;
