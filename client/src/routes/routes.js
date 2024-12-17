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
import About from "../pages/about/About";
import Product from "../pages/product/Product";
import Communion from "../pages/communion/Communion";
import Contact from "../pages/contact/Contact";
import Loader from "../components/loader/Loader";
//
import Dashboard from "../pages/layouts/dashboard/Dashboard";
import Orders from "../pages/layouts/orders/Orders";
import OrderDetails from "../pages/layouts/orders/OrderDetails";
import Stock from "../pages/layouts/stock/Stock";
import User from "../pages/layouts/user/User";
import Configuration from "../pages/layouts/configuration/Configuration";
import Bill from "../components/bill/Bill";
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
  manager: "manager",
  user: "user",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bill", element: <Bill /> },
      { path: "/loader", element: <Loader /> },
      { path: "/sign-in", element: <Login /> },
      { path: "/sign-up", element: <Register /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <Product /> },
      { path: "/communion", element: <Communion /> },
      { path: "/contacts", element: <Contact /> },
      { path: "/order", element: <Order /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.admin]} />,
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
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.manager]} />,
            children: [
              {
                path: "/manager",
                element: <Administration />,
                children: [
                  { path: "/manager", element: <Orders /> },
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
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.user]} />,
            children: [
              {
                path: "/user",
                element: <Administration />,
                children: [
                  { path: "/user", element: <Orders /> },
                  {
                    path: "orders/:order_code/details",
                    element: <OrderDetails />,
                  },
                  {
                    path: "configuration",
                    element: <Configuration />,
                    children: [{ index: true, element: <Profile /> }],
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
