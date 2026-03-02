import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useSnackBar from "../../hooks/UseSnackBar";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import Fetch from "../../services/Fetch";
import RequestDetails from "../../popup/RequestDetails";
import SnackbarAlert from "../../components/SnackBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RequestFilter from "../../popup/RequestsFilter";
import { useConstants } from "../../hooks/UseConstants";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePopups } from "../../hooks/UsePopups";
import { useRequestsFilter } from "../../filter/UseRequestsFilter";
import { FormattedMessage, useIntl } from "react-intl";

function Requests() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, sendWait, setSendWait, filterWait, setFilterWait } = useWaits();
    const { status, setStatus, from, setFrom, to, setTo, value, setValue, teacherId, setTeacherId } = useRequestsFilter();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { setPopup } = usePopups();
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
    const [order, setOrder] = useState('');
    const theme = useTheme();
    const intl = useIntl();

    const setFilterStatus = (s) => {
        setStatus((prevStatus) => {
            if (prevStatus.includes(s)) {
                return prevStatus.filter((state) => s !== state)
            } else {
                return [...prevStatus, s]
            }
        }
        )
    }

    const getCoursesRequests = async () => {
        const queryStatus = status.map(s => `status[]=${s}`).join("&");
        let result = await Fetch(host + `/courses?page=${page + 1}&${order}&search=${search}&${queryStatus}${from && to && `&from=${from}&to=${to}`}${teacherId && `&teacher_id=${teacherId}`}${courseName && `&search=${courseName}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            const sorted = result.data.data.sort((a, b) =>
                a.status === 'pending' ? -1 :
                    b.status === 'pending' ? 1 : 0
            );
            setCoursesRequests(sorted);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const requestsFiltering = async () => {

        const queryStatus = status.map(s => `status[]=${s}`).join("&");
        let result = await Fetch(host + `/courses?page=${page + 1}&${order}&search=${search}&${queryStatus}${from && to && `&from=${from}&to=${to}`}${teacherId && `&teacher_id=${teacherId}`}${courseName && `&search=${courseName}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setRequestCounts(result.data.pagination.total);
            setCoursesRequests(result.data.data);
            setCurrentPage(page);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    const getCourseDetails = async (id) => {
        setRequest(coursesRequests.find((item) => item.id === id));
        setPopup('details', 'flex');
    }

    const changeCourseStatus = async (courseId, status) => {
        setCourseId(courseId);
        setOperation(status);
        setSendWait(true);
        const formData = new FormData();
        formData.append('new_status', status);
        let result = await Fetch(host + `/admin/courses/${courseId}/change-status`, 'POST', formData);
        if (result.status === 200) {
            getCoursesRequests();
            setSnackBar('success', status === 'accepted' ? <FormattedMessage id='approved_msg' /> : <FormattedMessage id='rejected_msg' />);
            setCourseId(null);
        }
        setSendWait(false);
    }

    useEffect(() => {
        getCoursesRequests();
    }, [page, search, order]);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{float: language === 'en' && 'right'}}>
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir="rtl" sx={{float: language === 'en' && 'right'}}>
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress size={70} />
                                    </Box>
                                    :
                                    <Box className="rounded-xl px-2" dir={language === 'en' ? "ltr" : "rtl"}>
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='approval_requests' /></Typography>
                                        </Box>
                                        <Box className="">
                                            {/* Approval Requests Table Container */}
                                            <TableContainer component={Paper} dir={language === 'en' ? "ltr" : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => setPopup('filter', 'flex')} fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-9/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({id: 'search_course_teacher_name'})} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{right: language === 'en' && '90%'}}/>
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                        <select style={{ backgroundColor: theme.palette.background.select }} onChange={(e) => setOrder(e.target.value)} className="w-2/5 py-1 rounded-lg mx-3 outline-none">
                                                            <option value=''><FormattedMessage id='date' /></option>
                                                            <option value={language === 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}><FormattedMessage id='course_name' /></option>
                                                            <option value='order_by=teacher.name&direction=asc'><FormattedMessage id='teacher_name' /></option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_requests' />: {requestCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Approval Requests Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    {/* Table Head */}
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='request_id' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='course_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='teacher_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='request_date' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='status' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    {/* Table Body */}
                                                    <TableBody>
                                                        {coursesRequests.map((request, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} component="th" scope="row" className="cursor-pointer" onClick={() => { request.status !== 'rejected' && request.status !== 'accepted' && getCourseDetails(request.id) }}>{request.id}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} component="th" scope="row">
                                                                    {language === 'en' ? request.name_en : request.name_ar}
                                                                </StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mx-2">{request.teacher.first_name} {request.teacher.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{request.teacher.first_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"}>{request.created_at.split(" ")[0]}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"}><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: request.status === 'accepted' ? "#CCFFCC" : request.status === 'rejected' ? "#FF9999" : "#FCF0CF", color: request.status === 'accepted' ? "green" : request.status === 'rejected' ? "red" : "orange" }}>{request.status === 'accepted' ? <FormattedMessage id='approved' /> : request.status === 'rejected' ? <FormattedMessage id='rejected' /> : <FormattedMessage id='wait_approval' />}</Box></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="!flex justify-between" sx={{flexDirection: language === 'en' && 'row-reverse'}}>
                                                                    <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'rejected')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                                        {sendWait && courseId === request.id && operation === 'rejected' ?
                                                                            <CircularProgress size={20} className="" color="white" />
                                                                            :
                                                                            <FormattedMessage id='reject' />
                                                                        }
                                                                    </Button>
                                                                    <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'accepted')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                                        {sendWait && courseId === request.id && operation === 'accepted' ?
                                                                            <CircularProgress size={20} className="" color="white" />
                                                                            :
                                                                            <FormattedMessage id='approve' />
                                                                        }
                                                                    </Button>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
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

                        {/* Approval Requests Details Popup */}
                        <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0" sx={{right: language === 'en' && '0'}}>
                            <RequestDetails onClickClose={() => setPopup('details', 'none')} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request} />
                        </Box>

                        {/* Approval Requests Filter Popup */}
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center hidden max-sm:left-0" sx={{right: language === 'en' && '0'}}>
                            <RequestFilter filterWait={filterWait} setFilterWait={setFilterWait} courseName={courseName} setCourseName={setCourseName} value={value} setValue={setValue} setFrom={setFrom} setTo={setTo} from={from} to={to} status={status} setStatus={setStatus} setTeacherId={setTeacherId} onClickClose={() => setPopup('filter', 'none')} onClickStatus={setFilterStatus} onClickConfirm={requestsFiltering} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Requests;