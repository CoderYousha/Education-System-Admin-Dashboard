import Dashboard from "../pages/dashboard/Dashboard";
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
        }
    ];
}

export default DashboardRoutes;