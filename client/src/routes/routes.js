import MainLayout from "../MainLayout";
import PersistLogin from "../hooks/context/state/PersistLogin";
import RequireAuth from "../hooks/context/state/RequireAuth";
//
// pages
import Home from "../pages/home/Home";
import Order from "../pages/order/Order";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Administration from "../pages/users/admin/Administration";
//
import Dashboard from "../pages/layouts/dashboard/Dashboard";
import Orders from "../pages/layouts/orders/Orders";
import OrderDetails from "../pages/layouts/orders/OrderDetails";
import Stock from "../pages/layouts/stock/Stock";
import User from "../pages/layouts/user/User";
import Configuration from "../pages/layouts/configuration/Configuration";
//
import Category from "../pages/layouts/configuration/category/Category";
import Article from "../pages/layouts/configuration/article/Article";
import Profile from "../pages/layouts/configuration/profile/Profile";
//
// Control
import NotFound from "../pages/404";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
  admin: "admin",
  user: "user",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in", element: <Login /> },
      { path: "/sign-up", element: <Register /> },
      { path: "/order", element: <Order /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.admin, ROLES.user]} />,
            children: [
              {
                path: "/admin",
                element: <Administration />,
                children: [
                  { path: "/admin", element: <Dashboard /> },
                  { path: "orders", element: <Orders /> },
                  {
                    path: "orders/:order_code/details",
                    element: <OrderDetails />,
                  },
                  { path: "stocks", element: <Stock /> },
                  { path: "users", element: <User /> },
                  {
                    path: "configuration",
                    element: <Configuration />,
                    children: [
                      { index: true, element: <Article /> },
                      { path: "categories", element: <Category /> },
                      { path: "profile", element: <Profile /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
];
