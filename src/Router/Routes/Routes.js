import { createBrowserRouter } from "react-router-dom";
import Root from "../../layout/Root";
import Home from "../../Pages/HomePages/Home/Home";
import LogIn from "../../Pages/Login/LogIn";
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
            }
        ]
    }

])

export default router;