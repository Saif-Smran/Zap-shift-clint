import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Covarage/Coverage";




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