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
        name: "menu.admin.manage-hotpot",
        link: "/system/manage-hotpot",
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
