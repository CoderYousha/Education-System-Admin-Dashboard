import Courses from "../pages/courses/Courses";

function CoursesRoutes() {
    return [
        {
            path: '/courses',
            element: <Courses />
        },
    ];
}

export default CoursesRoutes;