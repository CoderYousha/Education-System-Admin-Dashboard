import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useSnackBar from "../../hooks/UseSnackBar";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import styled from "styled-components";
import Fetch from "../../services/Fetch";
import RequestDetails from "../../popup/RequestDetails";
import SnackbarAlert from "../../components/SnackBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RequestFilter from "../../popup/RequestsFilter";

function Requests() {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const language = localStorage.getItem('language') || 'ar';
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, sendWait, setSendWait, filterWait, setFilterWait } = useWaits();
    const [request, setRequest] = useState('');
    const [coursesRequests, setCoursesRequests] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [operation, setOperation] = useState(null);
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [requestCounts, setRequestCounts] = useState('');
    const [search, setSearch] = useState('');
    const [courseName, setCourseName] = useState('');
    const [status, setStatus] = useState(['pending', 'accepted', 'rejected']);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [value, setValue] = useState(null);
    const [teacherId, setTeacherId] = useState('');
    const [order, setOrder] = useState('');
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

    const setFilterStatus = (s) => {
        setStatus((prevStatus) => {
            if (prevStatus.includes(s)) {
                return prevStatus.filter((state) => s != state)
            } else {
                return [...prevStatus, s]
            }
        }
        )
    }

    const resetFilter = () => {
        setValue();
        setStatus(['pending', 'accepted', 'rejected']);
        setFrom('');
        setTo('');
        setTeacherId('');
        setCourseName('');
    }

    const getCoursesRequests = async () => {
        const queryStatus = status.map(s => `status[]=${s}`).join("&");
        let result = await Fetch(host + `/courses?page=${page + 1}&${order}&search=${search}&${queryStatus}${from && to && `&from=${from}&to=${to}`}${teacherId && `&teacher_id=${teacherId}`}${courseName && `&search=${courseName}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            setCoursesRequests(result.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const orderingRequests = async () => {
        const queryStatus = status.map(s => `status[]=${s}`).join("&");
        let result = await Fetch(host + `/courses?page=${page + 1}&search=${search}&${order}&${queryStatus}${from && to && `&from=${from}&to=${to}`}${teacherId && `&teacher_id=${teacherId}`}${courseName && `&search=${courseName}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            setCoursesRequests(result.data.data);
            setCurrentPage(page);
        }
    }

    const requestsFiltering = async () => {

        const queryStatus = status.map(s => `status[]=${s}`).join("&");
        let result = await Fetch(host + `/courses?page=${page + 1}&${order}&search=${search}&${queryStatus}${from && to && `&from=${from}&to=${to}`}${teacherId && `&teacher_id=${teacherId}`}${courseName && `&search=${courseName}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            setCoursesRequests(result.data.data);
            setCurrentPage(page);
            closeFilter();
        }

        setFilterWait(false);
    }

    const getCourseDetails = async (id) => {
        setRequest(coursesRequests.find((item) => item.id == id));
        console.log(coursesRequests.find((item) => item.id == id));
        document.getElementById('popup').style.display = 'flex';
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

    useEffect(() => {
        orderingRequests();
    }, [order]);

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
                                    <Box className="rounded-xl">
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">طلبات الموافقة</Typography>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir="rtl">
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => openFilter()} fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-8/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث باسم الدورة أو المدرس" />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                        <select style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setOrder(e.target.value)} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                            <option value=''>التاريخ</option>
                                                            <option value={language == 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}>اسم الدورة</option>
                                                            <option value='order_by=teacher.name&direction=asc'>اسم الأستاذ</option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500">إجمالي الطلبات: {requestCounts}</Typography>
                                                    </Box>
                                                </Box>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align="right">اسم الدورة</StyledTableCell>
                                                            <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                            <StyledTableCell align="right">تاريخ الطلب</StyledTableCell>
                                                            <StyledTableCell align="right">الحالة</StyledTableCell>
                                                            <StyledTableCell align="right">الإجراءات</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {coursesRequests.map((request, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell align="right" component="th" scope="row">
                                                                    {language === 'en' ? request.name_en : request.name_ar}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">{request.teacher.first_name} {request.teacher.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{request.teacher.first_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                <StyledTableCell align="right">{request.created_at.split(" ")[0]}</StyledTableCell>
                                                                <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: request.status === 'accepted' ? "#CCFFCC" : request.status === 'rejected' ? "#FF9999" : "#FCF0CF", color: request.status === 'accepted' ? "green" : request.status === 'rejected' ? "red" : "orange" }}>{request.status === 'accepted' ? 'تمت الموافقة' : request.status === 'rejected' ? 'تم الرفض' : 'بانتظار الموافقة'}</Box></StyledTableCell>
                                                                <StyledTableCell align="right" className="!flex justify-between">
                                                                    <Button onClick={() => getCourseDetails(request.id)} disabled={request.status === 'rejected' || request.status === 'accepted'} className="h-8 !bg-gray-200 !text-gray-700">عرض التفاصيل</Button>
                                                                    <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'rejected')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                                        {sendWait && courseId === request.id && operation === 'rejected' ?
                                                                            <CircularProgress size={20} className="" color="white" />
                                                                            :
                                                                            'رفض'
                                                                        }
                                                                    </Button>
                                                                    <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'accepted')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                                        {sendWait && courseId === request.id && operation === 'accepted' ?
                                                                            <CircularProgress size={20} className="" color="white" />
                                                                            :
                                                                            'قبول'
                                                                        }
                                                                    </Button>
                                                                </StyledTableCell>
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
                        }
                        </Box>
                        <Box id="popup" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                            <RequestDetails onClickClose={closePopup} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request} />
                        </Box>
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                            <RequestFilter filterWait={filterWait} setFilterWait={setFilterWait} courseName={courseName} setCourseName={setCourseName} value={value} setValue={setValue} setFrom={setFrom} setTo={setTo} from={from} to={to} status={status} setTeacherId={setTeacherId} onClickClose={closeFilter} onClickReset={resetFilter} onClickStatus={setFilterStatus} onClickConfirm={requestsFiltering} />
                        </Box>
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Requests;