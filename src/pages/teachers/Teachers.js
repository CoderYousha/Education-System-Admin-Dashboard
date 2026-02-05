import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useSnackBar from "../../hooks/UseSnackBar";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import styled from "styled-components";
import Fetch from "../../services/Fetch";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import RequestDetails from "../../popup/RequestDetails";
import SnackbarAlert from "../../components/SnackBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StudentFilter from "../../popup/StudentFilter";
import AddIcon from '@mui/icons-material/Add';
import AddTeacher from "../../popup/AddTeacher";

function Teachers() {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const language = localStorage.getItem('language') || 'ar';
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const [request, setRequest] = useState('');
    const [coursesRequests, setCoursesRequests] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [operation, setOperation] = useState(null);
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [requestCounts, setRequestCounts] = useState('');
    const [search, setSearch] = useState('');
    const theme = useTheme();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#cccccc'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const closePopup = () => {
        document.getElementById('popup').style.display = 'none';
    }

    const openFilter = async () => {
        document.getElementById('filter').style.display = 'flex';
    }

    const closeFilter = () => {
        document.getElementById('filter').style.display = 'none';
    }

    const getCoursesRequests = async () => {
        let result = await Fetch(host + `/courses?page=${page + 1}&search=${search}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            setCoursesRequests(result.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const changeCourseStatus = async (courseId, status) => {
        setCourseId(courseId);
        setOperation(status);
        setSendWait(true);
        let result = await Fetch(host + `/admin/courses/${courseId}/change-status`, 'POST', JSON.stringify({ 'new_status': status }));
        if (result.status === 200) {
            getCoursesRequests();
            setSnackBar('success', status === 'accepted' ? 'تم التفعيل بنجاح' : 'تم الرفض بنجاح');
            setCourseId(null);
        }
        setSendWait(false);
    }

    useEffect(() => {
        getCoursesRequests();
    }, [page, search]);

    return (
        <>
            {
                wait || getWait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Sidebar />
                        <Header />
                        <Box className="w-4/5 rounded-xl relative" dir="rtl">
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl">
                                <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2">
                                    <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">المدرسون</Typography>
                                    <Button variant="contained" className="">
                                        <AddIcon />
                                        إضافة مدرس جديد
                                    </Button>
                                </Box>
                                <Box>
                                    <TableContainer component={Paper} dir="rtl">
                                        <Box className="min-h-12 py-2 px-2 flex justify-between items-center">
                                            <Box className="w-full flex items-center">
                                                <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => openFilter()} fontSize="large" />
                                                <Box className="w-2/4 relative mr-3">
                                                    <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none" placeholder="البحث باسم المدرس أو البريد الإلكتروني" />
                                                    <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                </Box>
                                            </Box>
                                            <Box className="flex w-2/4 items-center">
                                                <select style={{ backgroundColor: theme.palette.background.default }} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                    <option>اسم المدرس</option>
                                                    <option>البريد الإلكتروني</option>
                                                </select>
                                                <Typography variant="body1" className="!text-gray-500">إجمالي المدرسين: {requestCounts}</Typography>
                                            </Box>
                                        </Box>
                                        <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead className="bg-gray-200">
                                                <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                    <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                    <StyledTableCell align="right">الإختصاص</StyledTableCell>
                                                    <StyledTableCell align="right">التخصص التعليمي</StyledTableCell>
                                                    <StyledTableCell align="right" className="!text-center">الدرجة العلمية</StyledTableCell>
                                                    <StyledTableCell align="right">البريد الإلكتروني</StyledTableCell>
                                                    <StyledTableCell align="right" className="!text-center">الرقم</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {coursesRequests.map((request, index) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align="right" component="th" scope="row">
                                                            محمد عماد يوسف
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right" className="">الأمن السيبراني</StyledTableCell>
                                                        <StyledTableCell align="right">التعليم الجامعي  </StyledTableCell>
                                                        <StyledTableCell align="right" className="text-center">دكتوراه</StyledTableCell>
                                                        <StyledTableCell align="right" className="!text-center">mhdyou10@gmail.com</StyledTableCell>
                                                        <StyledTableCell align="right" className="!text-center">0912345678</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Box className="flex justify-center items-center" dir="rtl">
                                            <Button disabled={page + 1 == totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                <NavigateNextIcon fontSize="large" />
                                            </Button>
                                            <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                            <Button disabled={page + 1 == 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                <NavigateBeforeIcon fontSize="large" />
                                            </Button>
                                        </Box>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Box>
                        <Box id="popup" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                            <RequestDetails onClickClose={closePopup} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request} />
                        </Box>
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center hidden max-sm:left-0">
                            <StudentFilter onClickClose={closeFilter} />
                        </Box>
                        {/* <Box id="add" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center flex max-sm:left-0">
                            <AddTeacher onClickClose={closeFilter} />
                        </Box> */}
                        {/* <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 flex justify-center items-center max-sm:left-0">
                                <StudentDetails onClickClose={closeFilter} />
                            </Box> */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Teachers;