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
import { FormattedMessage, useIntl } from "react-intl";
import { useSearch } from "../../hooks/UseSearch";
import { usePagination } from "../../hooks/UsePagination";

function Courses() {
    const intl = useIntl();
    const theme = useTheme();
    const { wait } = useContext(AuthContext);
    const { setPopup } = usePopups();
    const { host, language } = useConstants();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { search, setSearch, order, setOrder } = useSearch();
    const { openSnackBar, type, message, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, filterWait, setFilterWait } = useWaits();
    const { category, setCategory, categoriesValue, setCategoriesValue, path, setPath, pathsValue, setPathsValue, fromCount, setFromCount, toCount, setToCount, fromDate, setFromDate, toDate, setToDate } = useCoursesFilter();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const [coursesCounts, setCoursesCounts] = useState('');
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');

    {/* Get Courses Function */}
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

    {/* Get Specefic Course Details */}
    const getCourseDetails = (id, pathId) => {
        const courseDetails = courses.find((course) => course.id === id)
        const path = courseDetails?.paths.find((path) => path.id === pathId);
        setCourse({ "course": courseDetails, "path": path });

        setPopup('details', 'flex');
    }

    {/* Filtering Courses Function */}
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
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='courses' /></Typography>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_course_teacher_name" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <select onChange={(e) => setOrder(e.target.value)} style={{ backgroundColor: theme.palette.background.select }} className="w-2/5 py-1 rounded-lg mx-3 outline-none">
                                                            <option value=''><FormattedMessage id='date' /></option>
                                                            <option value={language === 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}><FormattedMessage id='course_name' /></option>
                                                            <option value='order_by=teacher.name&direction=asc'><FormattedMessage id='teacher_name' /></option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_courses' />: {coursesCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Courses Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='course_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='teacher_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><FormattedMessage id='education_path' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='course_files_count' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='publication_date' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {courses.map((course, index) =>
                                                            course.paths.length !== 0 ?
                                                                course.paths.map((path, index) =>
                                                                    <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => getCourseDetails(course.id, path.id)}>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">{language === 'en' ? course.name_en : course.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{course.teacher.first_name + ' ' + course.teacher.last_name}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{language === 'en' ? course.category.name_en : course.category.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="text-center">{language === 'en' ? path.name_en : path.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{course.contents?.filter((content) => content.content_type === 'CourseFile').length}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center" dir="ltr">{course.created_at.split(" ")[0]}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                                :
                                                                <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => getCourseDetails(course.id, null)}>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">{language === 'en' ? course.name_en : course.name_ar}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{course.teacher.first_name + ' ' + course.teacher.last_name}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{language === 'en' ? course.category.name_en : course.category.name_ar}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="text-center"><FormattedMessage id="nothing" /></StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{course.contents?.filter((content) => content.content_type === 'CourseFile').length}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center" dir="ltr">{course.created_at.split(" ")[0]}</StyledTableCell>
                                                                </StyledTableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>

                                                {/* Pagination Buttons */}
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

                        {/* Course Details Popup */}
                        <Box id="details" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                            <CourseDetails onClickClose={() => setPopup('details', 'none')} data={course} />
                        </Box>

                        {/* Filtering Courses Popup */}
                        <Box id="filter" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <CoursesFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringCourses}
                                categoriesValue={categoriesValue} fromCount={fromCount} toCount={toCount} fromDate={fromDate}
                                toDate={toDate} pathsValue={pathsValue} filterWait={filterWait} setCategoriesValue={setCategoriesValue}
                                setPathsValue={setPathsValue} setToDate={setToDate} setCategory={setCategory} setPath={setPath}
                                setFromCount={setFromCount} setFromDate={setFromDate} setToCount={setToCount} setFilterWait={setFilterWait} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Courses;