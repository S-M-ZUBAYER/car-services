import { createBrowserRouter } from "react-router-dom";
import Root from "../../layout/Root";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Home from "../../Pages/HomePages/Home/Home";
import LogIn from "../../Pages/Login/LogIn";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
            {
                path: '/services/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader: ({ params }) => fetch(`https://genius-car-resources-server.vercel.app/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            }
        ]
    }

])

export default router;