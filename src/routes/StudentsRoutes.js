import Students from "../pages/students/Students";

function StudentsRoutes () {
    return [
        {
            path: '/students',
            element: <Students />
        }
    ];
}

export default StudentsRoutes;