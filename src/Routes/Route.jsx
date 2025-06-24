import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Covarage/Coverage";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import AddParcel from "../Pages/AddParcel/AddPercel";


export const route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/coverage",
                element: <Coverage></Coverage>
            },
            
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'my-parcels',
                element: <MyParcels />
            },
            {
                path: 'add-parcel',
                element: <AddParcel></AddParcel>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children:[
            {
                path: "login",
                element: <LoginPage></LoginPage>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    }
])