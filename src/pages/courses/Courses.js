import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useSnackBar from "../../hooks/UseSnackBar";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import Fetch from "../../services/Fetch";
import SnackbarAlert from "../../components/SnackBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CourseDetails from "../../popup/CourseDetails";
import CoursesFilter from "../../popup/CoursesFilter";
import { useCoursesFilter } from "../../filter/UseCoursesFilter";
import { usePopups } from "../../hooks/UsePopups";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { useConstants } from "../../hooks/UseConstants";

function Courses() {
    const {host, language} = useConstants();
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, filterWait, setFilterWait } = useWaits();
    const { category, setCategory, categoriesValue, setCategoriesValue, path, setPath, pathsValue, setPathsValue, fromCount, setFromCount, toCount, setToCount, fromDate, setFromDate, toDate, setToDate } = useCoursesFilter();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { setPopup } = usePopups();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [coursesCounts, setCoursesCounts] = useState('');
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const [course, setCourse] = useState('');
    const [order, setOrder] = useState('');
    const theme = useTheme();

    const getCourses = async () => {
        let result = await Fetch(host + `/courses?status[]=accepted&page=${page + 1}&search=${search}&${order}${category && `&category_id=${category}`}${path && `&path_id=${path}`}${fromCount && `&files_number[from]=${fromCount}`}${category && `&files_number[to]=${toCount}`}${fromDate && `&from=${fromDate}`}${toDate && `&to=${toDate}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setCoursesCounts(result.data.pagination.total);
            setCourses(result.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const getCourseDetails = (id, pathId) => {
        const courseDetails = courses.find((course) => course.id === id)
        const path = courseDetails?.paths.find((path) => path.id === pathId);
        setCourse({ "course": courseDetails, "path": path });

        setPopup('details', 'flex');
    }

    const filteringCourses = async () => {
        let result = await Fetch(host + `/courses?status[]=accepted&page=${page + 1}&search=${search}&${order}${category && `&category_id=${category}`}${path && `&path_id=${path}`}${fromCount && `&files_number[from]=${fromCount}`}${category && `&files_number[to]=${toCount}`}${fromDate && `&from=${fromDate}`}${toDate && `&to=${toDate}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setCourses(result.data.data);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    useEffect(() => {
        getCourses();
    }, [page, search, order]);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir="rtl">
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">الدورات</Typography>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir="rtl">
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث باسم الدورة أو اسم المدرس" />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <select onChange={(e) => setOrder(e.target.value)} style={{ backgroundColor: theme.palette.background.select }} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                            <option value=''>التاريخ</option>
                                                            <option value={language === 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}>اسم الدورة</option>
                                                            <option value='order_by=teacher.name&direction=asc'>اسم الأستاذ</option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500">إجمالي الدورات: {coursesCounts}</Typography>
                                                    </Box>
                                                </Box>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align="right">اسم الدورة</StyledTableCell>
                                                            <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                            <StyledTableCell align="right">الفئة</StyledTableCell>
                                                            <StyledTableCell align="right" className="">المسار التعليمي</StyledTableCell>
                                                            <StyledTableCell align="right">عدد ملفات الدورة</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">تاريخ النشر</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {courses.map((course, index) =>
                                                            course.paths.length !== 0 ?
                                                                course.paths.map((path, index) =>
                                                                    <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => getCourseDetails(course.id, path.id)}>
                                                                        <StyledTableCell align="right" component="th" scope="row">{language === 'en' ? course.name_en : course.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align="right" className="">{course.teacher.first_name + ' ' + course.teacher.last_name}</StyledTableCell>
                                                                        <StyledTableCell align="right">{language === 'en' ? course.category.name_en : course.category.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align="right" className="text-center">{language === 'en' ? path.name_en : path.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align="right" className="">{course.contents?.filter((content) => content.content_type === 'CourseFile').length}</StyledTableCell>
                                                                        <StyledTableCell align="right" className="!text-center" dir="ltr">{course.created_at.split(" ")[0]}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                                :
                                                                <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => getCourseDetails(course.id, null)}>
                                                                    <StyledTableCell align="right" component="th" scope="row">{language === 'en' ? course.name_en : course.name_ar}</StyledTableCell>
                                                                    <StyledTableCell align="right" className="">{course.teacher.first_name + ' ' + course.teacher.last_name}</StyledTableCell>
                                                                    <StyledTableCell align="right">{language === 'en' ? course.category.name_en : course.category.name_ar}</StyledTableCell>
                                                                    <StyledTableCell align="right" className="text-center">لا يوجد</StyledTableCell>
                                                                    <StyledTableCell align="right" className="">{course.contents?.filter((content) => content.content_type === 'CourseFile').length}</StyledTableCell>
                                                                    <StyledTableCell align="right" className="!text-center" dir="ltr">{course.created_at.split(" ")[0]}</StyledTableCell>
                                                                </StyledTableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                                <Box className="flex justify-center items-center" dir="rtl">
                                                    <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                        <NavigateNextIcon fontSize="large" />
                                                    </Button>
                                                    <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                                    <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                        <NavigateBeforeIcon fontSize="large" />
                                                    </Button>
                                                </Box>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                        <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                            <CourseDetails onClickClose={() => setPopup('details', 'none')} data={course} />
                        </Box>
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <CoursesFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringCourses}
                                categoriesValue={categoriesValue} fromCount={fromCount} toCount={toCount} fromDate={fromDate}
                                toDate={toDate} pathsValue={pathsValue} filterWait={filterWait} setCategoriesValue={setCategoriesValue}
                                setPathsValue={setPathsValue} setToDate={setToDate} setCategory={setCategory} setPath={setPath}
                                setFromCount={setFromCount} setFromDate={setFromDate} setToCount={setToCount} setFilterWait={setFilterWait} />
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Courses;