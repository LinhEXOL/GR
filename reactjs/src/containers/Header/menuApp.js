export const adminMenu = [
  {
    //quản lý các món lẩu
    name: "menu.admin.manage-hotpot",
    menus: [
      {
        name: "menu.admin.crud-hotpot",
        link: "/system/CRUD-hotpot",
      },
      {
        name: "menu.admin.crud-hotpot-redux",
        link: "/system/hotpot-redux",
      },
      {
        name: "menu.admin.extra-info-hotpot",
        link: "/system/extra-info-hotpot",
      },
      {
        //quản lý lịch đặt lẩu

        name: "menu.admin.schedule",
        link: "/system/schedule-manage",
      },
    ],
  },
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-user",
        link: "/system/CRUD-user",
      },
      {
        name: "menu.admin.crud-user-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/admin-manage",
      },
      {
        name: "menu.admin.manage-customer",
        link: "/system/customer-manage",
      },
    ],
  },
  {
    //quản lý nhà hàng
    name: "menu.admin.restaurant",
    menus: [
      {
        name: "menu.admin.manage-restaurant",
        link: "/system/manage-restaurant",
      },
    ],
  },
  {
    //quản lý hp
    name: "menu.admin.hp",
    menus: [
      {
        name: "menu.admin.manage-hp",
        link: "/system/manage-hp",
      },
    ],
  },
  {
    //quản lý loại lẩu
    name: "menu.admin.type",
    menus: [
      {
        name: "menu.admin.manage-type",
        link: "/system/manage-type",
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/handbook-manage",
      },
    ],
  },
];

export const staffMenu = [
  {
    //quản lý các món lẩu
    name: "menu.staff.manage-hotpot",
    menus: [
      // {
      //   name: "menu.staff.crud-hotpot",
      //   link: "/staff/CRUD-hotpot",
      // },
      {
        name: "menu.staff.crud-hotpot-redux",
        link: "/staff/hotpot-redux",
      },
      {
        name: "menu.staff.extra-info-hotpot",
        link: "/staff/extra-info-hotpot",
      },
      {
        //quản lý lịch đặt lẩu

        name: "menu.staff.schedule",
        link: "/staff/schedule-manage",
      },
    ],
  },
  // {
  //   //quản lý người dùng
  //   name: "menu.staff.manage-user",
  //   menus: [
  //     {
  //       name: "menu.staff.crud-user",
  //       link: "/system/CRUD-user",
  //     },
  //     {
  //       name: "menu.staff.crud-user-redux",
  //       link: "/system/user-redux",
  //     },
  //     {
  //       name: "menu.staff.manage-staff",
  //       link: "/system/staff-manage",
  //     },
  //     {
  //       name: "menu.staff.manage-customer",
  //       link: "/system/customer-manage",
  //     },
  //   ],
  // },
  {
    //quản lý nhà hàng
    name: "menu.staff.restaurant",
    menus: [
      {
        name: "menu.staff.manage-restaurant",
        link: "/system/manage-restaurant",
      },
    ],
  },
  {
    //quản lý hp
    name: "menu.staff.hp",
    menus: [
      {
        name: "menu.staff.manage-hp",
        link: "/system/manage-hp",
      },
    ],
  },
  {
    //quản lý loại lẩu
    name: "menu.staff.type",
    menus: [
      {
        name: "menu.staff.manage-type",
        link: "/system/manage-type",
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: "menu.staff.handbook",
    menus: [
      {
        name: "menu.staff.manage-handbook",
        link: "/system/handbook-manage",
      },
    ],
  },
];
