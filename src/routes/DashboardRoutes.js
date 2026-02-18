import Dashboard from "../pages/dashboard/Dashboard";
import Notifications from "../pages/dashboard/Notifications";
import Requests from "../pages/dashboard/Requests";

function DashboardRoutes () {
    return [
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/accept-requests',
            element: <Requests />
        },
        {
            path: '/notifications',
            element: <Notifications />
        }
    ];
}

export default DashboardRoutes;