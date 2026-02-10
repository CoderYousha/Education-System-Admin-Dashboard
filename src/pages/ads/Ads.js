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
import AddIcon from '@mui/icons-material/Add';
import TeachersFilter from "../../popup/TeachersFilter";
import { useConstants } from "../../hooks/UseConstants";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePopups } from "../../hooks/UsePopups";
import { useTeachersFilter } from "../../filter/UseTeachersFilter";
import AdsDetails from "../../popup/AdsDetails";
import AddAds from "../../popup/AddAds";
import UpdateAds from "../../popup/UpdateAds";
import DeleteDialog from "../../popup/DeleteDialog";

function Ads() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, filterWait, setFilterWait } = useWaits();
    const { majorId, setMajorId, majorsValue, setMajorsValue, teacherSpecializations, setTeacherSpecializations, teacherSpecializationsValue, setTeacherSpecializationsValue, academicDegree, setAcademicDegree, academicDegreeValue, setAcademicDegreeValue } = useTeachersFilter();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { setPopup } = usePopups();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [teachersCounts, setTeachersCounts] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');
    const theme = useTheme();

    const getTeachers = async () => {
        let result = await Fetch(host + `/admin/users?account_role=teacher&page=${page + 1}&search=${search}&direction=asc&${order && `order_by=${order}`}${majorId && `&major_id=${majorId}`}${teacherSpecializations && `&specialization_id=${teacherSpecializations}`}${academicDegree && `&academic_degree_id=${academicDegree}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setTeachersCounts(result.data.data.total);
            setTeachers(result.data.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const filteringTeachers = async () => {
        let result = await Fetch(host + `/admin/users?account_role=teacher&page=${page + 1}&search=${search}&direction=asc&${order && `order_by=${order}`}${majorId && `&major_id=${majorId}`}${teacherSpecializations && `&specialization_id=${teacherSpecializations}`}${academicDegree && `&academic_degree_id=${academicDegree}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setTeachersCounts(result.data.data.total);
            setTeachers(result.data.data.data);
            setCurrentPage(page);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    const teacherDetails = async (id) => {
        setTeacher(teachers.filter((teacher) => teacher.id === id)[0]);

        setPopup('details', 'flex');
    }

    useEffect(() => {
        getTeachers();
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
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl">
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">الإعلانات</Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="">
                                                <AddIcon />
                                                إضافة إعلان جديد
                                            </Button>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir="rtl">
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث بالعنوان أو الفئة/الدورة" />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <select onChange={(e) => setOrder(e.target.value)} style={{ backgroundColor: theme.palette.background.default }} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                            <option value=''>التاريخ</option>
                                                            <option value='first_name'>عنوان الإعلان</option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500">إجمالي الإعلانات: {teachersCounts}</Typography>
                                                    </Box>
                                                </Box>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align="right">عنوان الإعلان</StyledTableCell>
                                                            <StyledTableCell align="right">نوع الإعلان</StyledTableCell>
                                                            <StyledTableCell align="right">الفئة/الدورة</StyledTableCell>
                                                            <StyledTableCell align="right" className="">تاريخ البدء</StyledTableCell>
                                                            <StyledTableCell align="right">تاريخ الانتهاء</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">الحالة</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">الإجراءات</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {teachers.map((teacher, index) => (
                                                            <StyledTableRow key={index} onClick={() => teacherDetails(teacher.id)} className="hover:bg-gray-400 duration-100 cursor-pointer">
                                                                <StyledTableCell align="right" component="th" scope="row">خصم خاص للطلاب 30%</StyledTableCell>
                                                                <StyledTableCell align="right" className="">خصم</StyledTableCell>
                                                                <StyledTableCell align="right">أساسيات البرمجة</StyledTableCell>
                                                                <StyledTableCell align="right" className="text-center">2026-02-01</StyledTableCell>
                                                                <StyledTableCell align="right" className="">20262-02-20</StyledTableCell>
                                                                <StyledTableCell align="right" className="!text-center" dir="ltr">
                                                                    <select onClick={(e) => e.stopPropagation()} className="bg-green-300 font-bold text-green-700 rounded-lg w-3/4 outline-none">
                                                                        <option className="bg-green-300 font-bold text-green-700">نشط</option>
                                                                        <option className="bg-gray-300 font-bold text-gray-700">متوقف</option>
                                                                        <option className="bg-red-300 font-bold text-red-700">منهي</option>
                                                                    </select>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right" className="!flex justify-around items-center">
                                                                    <Button variant="contained" className="!bg-red-300 !font-bold !text-red-700">حذف</Button>
                                                                    <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800">تعديل</Button>
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
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <TeachersFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringTeachers} setAcademicDegree={setAcademicDegree} filterWait={filterWait} setFilterWait={setFilterWait} setMajorId={setMajorId} setTeacherSpecializations={setTeacherSpecializations} academicDegreeValue={academicDegreeValue} setAcademicDegreeValue={setAcademicDegreeValue} majorsValue={majorsValue} setMajorsValue={setMajorsValue} teacherSpecializationsValue={teacherSpecializationsValue} setTeacherSpecializationsValue={setTeacherSpecializationsValue} />
                        </Box>
                        <Box id="add" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AddAds onClickClose={() => setPopup('add', 'none')} />
                        </Box>
                        <Box id="update" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 flex justify-center items-center max-sm:left-0">
                            <UpdateAds onClickClose={() => setPopup('update', 'none')} />
                        </Box>
                        <Box id="delete" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <DeleteDialog onClickCancel={() => setPopup('delete', 'none')} title="حذف الإعلان" subtitle="الفئة" />
                        </Box>
                        <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AdsDetails onClickClose={() => setPopup('details', 'none')} />
                        </Box>
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Ads;