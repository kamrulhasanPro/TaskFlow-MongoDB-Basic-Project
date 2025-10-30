import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Home from "../Pages/Home"
import TaskFlow from "../Pages/TaskFlow"
import PrivateRoute from "./PrivateRoute"

export const MainRoute = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/task-flow',
                element: (
                    <PrivateRoute>
                        <TaskFlow/>
                    </PrivateRoute>
                ),
            }
        ]
    }
])