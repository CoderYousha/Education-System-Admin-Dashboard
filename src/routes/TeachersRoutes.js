import Teachers from "../pages/teachers/Teachers";

function TeachersRoutes() {
    return [
        {
            path: '/teachers',
            element: <Teachers />
        }
    ];
}

export default TeachersRoutes;