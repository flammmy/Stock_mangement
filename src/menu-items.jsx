const user = JSON.parse(localStorage.getItem('user'));
const userName = user?.name;
const filterMenuItem = (menu) => {
  const filterItems = (items) =>
    items
  .filter((item) => !(['Admin'].includes(userName) && ['users'].includes(item.id) )) 
  .filter((item) => !(['Operator'].includes(userName) && ['godown_stock',,'generated_gate_pass','approve_godown','invoice_out_index','users','suppliers','purchaser','products','stockin', 'invoice_out'].includes(item.id) )) 
  .filter((item) => !(['Supervisor'].includes(userName) && ['approve_godown','stockout','users','purchaser','customers','stock_to_godown','approve_operator','godown_stock',].includes(item.id) )) 
  .filter((item) => !(['Sub_Supervisor'].includes(userName) && ['approve_operator','invoice_operator_index','generated_gate_pass','stockin','usersGroup','users','purchaser','customers','invoice_out','invoice_out_stock','stock_to_godown','Invoice','All Out Stock','Send To Godown'].includes(item.id) )) 
  .map((item) =>
        item.children
          ? { ...item, children: filterItems(item.children) }
          : item
      );

  return { ...menu, items: filterItems(menu.items) };
};

// Menu items
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
          
          
        },
      ],
    },
    {
      id: 'usersGroup',
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
                  
                  },
            
            {
              id: 'suppliers',
              title: 'Suppliers',
              icon: 'feather icon-share-2',
              type: 'item',
              url: '/supplier',
             
            },
            {
              id: 'purchaser',
              title: 'Purchaser',
              icon: 'feather icon-users',
              type: 'item',
              url: '/receiver',
              
            },
            {
              id: 'customers',
              title: 'Customers',
              icon: 'feather icon-user-check',
              type: 'item',
              url: '/customers',
              
            },
            {
              id: 'products',
              title: 'Products',
              icon: 'feather icon-package',
              type: 'item',
              url: '/shades',
              
            },
          ],
        },
      ],
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
              url: '/invoices',
              
            },
            {
              id: 'add_invoice',
              title: 'Add Invoice',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/add-invoice',
              
            },
            {
              id: 'all_stocks',
              title: 'Purchase Stocks',
              icon: 'feather icon-clipboard',
              type: 'item',
              url: '/all-stocks',
              
            },
            {
              id: 'old_stock',
              title: 'Old Stock',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stocks/add-radius',
             
            },
            {
              id: 'all_old_stock',
              title: 'All Old Stock',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stocks/old-stock',
              
            },
            // {
            //   id: 'available_stocks',
            //   title: 'Available Stocks',
            //   icon: 'feather icon-clipboard',
            //   type: 'item',
            //   url: '/available-stocks',
              
            // },
          ],
        },
      ],
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
              url: '/invoice-out',
              
            },

            {
              id: 'invoice_out_index',
              title: 'All Out Invoice',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/all-invoices-out',
              
            },
            {
              id: 'invoice_operator_index',
              title: 'All Operator Invoice',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/operator_invoice',
              
            },
            {
              id: 'invoice_out_stock',
              title: 'All Out Stock',
              icon: 'feather icon-file-minus',
              type: 'item',
              url: '/all-out-stock',
              
            },
//  {
//               id: 'stock_to_godown',
//               title: 'Send To Godown',
//               icon: 'feather icon-file-minus',
//               type: 'item',
//               url: '/invoiceOut',
            
//             },
          ],
        },
      ],
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
              url: '/stockout/godown',
                        },
            {
              id: 'approve_godown',
              title: 'Approve Godown',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/approve/godown',
              
            },
            {
              id: 'generated_gate_pass',
              title: 'Generated Gate Pass',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/generated_gate_pass',
              
            },
            
            // {
            //   id: 'approve_operator',
            //   title: 'Approve Operator',
            //   icon: 'feather icon-file-plus',
            //   type: 'item',
            //   url: '/approve_operator',
              
            // },
            {
              id: 'godown_stock',
              title: 'Godown Stocks',
              icon: 'feather icon-file-plus',
              type: 'item',
              url: '/stocks/godown',
              
            },
          ],
        },
      ],
    },
    // {
    //   id: "quotation_in",
    //   title: "Quotation IN",
    //   type: "group",
    //   icon: "icon-ui",
    //   children: [
    //     {
    //       id: "quotation",
    //       title: "Quotation",
    //       type: "collapse",
    //       icon: "feather icon-box",
    //       children: [
    //         {
    //           id: "operator",
    //           title: "Operator",
    //           icon: 'feather icon-users',
    //           type: "item",
    //           url: "/operator",
             
    //         },
    //         {
    //           id: "quotation_invoice",
    //           title: "Quotation Invoice",
    //           icon: 'feather icon-file-minus',
    //           type: "item",
    //           url: "/quotation",
    //         },
    //         {
    //                         id: 'approve_operator',
    //                         title: 'Approve Operator',
    //                         icon: 'feather icon-file-plus',
    //                         type: 'item',
    //                         url: '/approve_operator',
                            
    //                       },
    //       ],
    //     },
    //   ],
    // },
  ],
};

// Filter the menu items
const filteredMenuItems = filterMenuItem(menuItems);

export default filteredMenuItems;



