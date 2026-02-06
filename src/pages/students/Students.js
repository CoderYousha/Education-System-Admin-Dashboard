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
import StudentDetails from "../../popup/StudentDetails";
import AlertDialog from "../../components/DialogView";
import { useDialog } from "../../hooks/UseDialog";

function Students() {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const language = localStorage.getItem('language') || 'ar';
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null);
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [studentsCount, setStudentsCount] = useState('');
    const [search, setSearch] = useState('');
    const { description, open, setDialog, setOpen, title } = useDialog();
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

    const openFilter = async () => {
        document.getElementById('filter').style.display = 'flex';
    }

    const closeFilter = () => {
        document.getElementById('filter').style.display = 'none';
    }

    const getStudents = async () => {
        let result = await Fetch(host + `/admin/users?account_role=student&page=${page + 1}&search=${search}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setStudentsCount(result.data.data.total);
            setStudents(result.data.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const deleteStudent = async () => {
        setSendWait(true);

        let result = await Fetch(host + `/admin/users/${studentId}/delete`, 'DELETE', null);

        if (result.status == 200) {
            setStudents((students) => students.filter((student) => student.id != studentId));
            setSnackBar('success', 'deleted successfully');
            setOpen(false);
        }

        setSendWait(false);
    }

    useEffect(() => {
        getStudents();
    }, [page, search]);

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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">الطلاب</Typography>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir="rtl">
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => openFilter()} fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث بالاسم الثلاثي أو البريد الإلكتروني" />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                        <select style={{ backgroundColor: theme.palette.background.default }} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                            <option>اسم الثلاثي</option>
                                                            <option>البريد الإلكتروني</option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500">إجمالي الطلاب: {studentsCount}</Typography>
                                                    </Box>
                                                </Box>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align="right">الاسم الثلاثي</StyledTableCell>
                                                            <StyledTableCell align="right">البريد الإلكتروني</StyledTableCell>
                                                            <StyledTableCell align="right">التخصص التعليمي</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">عدد الدورات المسجلة</StyledTableCell>
                                                            <StyledTableCell align="right">تاريخ التسجيل</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">الإجراء</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {students.map((student, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell align="right" component="th" scope="row">
                                                                    {student.first_name + ' ' + student.last_name}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right" className="">{student.email}</StyledTableCell>
                                                                <StyledTableCell align="right">{language == 'en' ? student.major?.name_en : student.major?.name_ar}</StyledTableCell>
                                                                <StyledTableCell align="right" className="!text-center">{student.enrolled_courses_count}</StyledTableCell>
                                                                <StyledTableCell align="right" className="text-center">{student?.verified_at?.split("T")[0]}</StyledTableCell>
                                                                <StyledTableCell align="right" className="!text-center">
                                                                    <Button variant="contained" className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white" onClick={() => { setStudentId(student.id); setDialog('Delete Student', 'Are you sure you want to delete this student') }}>حذف</Button>
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
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center hidden max-sm:left-0">
                            <StudentFilter onClickClose={closeFilter} />
                        </Box>
                        {/* <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 flex justify-center items-center max-sm:left-0">
                            <StudentDetails onClickClose={closeFilter} />
                        </Box> */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                        <AlertDialog wait={sendWait} openDialog={open} title={title} description={description} onCancel={() => setOpen(false)} onConfirm={() => deleteStudent()} />
                    </Box>
            }
        </>
    );
}

export default Students;