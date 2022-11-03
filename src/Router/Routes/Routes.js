import { createBrowserRouter } from "react-router-dom";
import Root from "../../layout/Root";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Home from "../../Pages/HomePages/Home/Home";
import LogIn from "../../Pages/Login/LogIn";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";

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
                element: <CheckOut></CheckOut>,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            }
        ]
    }

])

export default router;