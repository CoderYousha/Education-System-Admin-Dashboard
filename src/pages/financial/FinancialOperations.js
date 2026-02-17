import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useConstants } from "../../hooks/UseConstants";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePopups } from "../../hooks/UsePopups";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useWaits } from "../../hooks/UseWait";
import FinancialOperationsFilter from "../../popup/FinancialOperationsFilter";
import Fetch from "../../services/Fetch";
import { useFinancialOperationsFilter } from "../../filter/UseFinancialOperationsFilter";

function FinancialOperations() {
    const { language, host } = useConstants();
    const { setPopup } = usePopups();
    const { wait } = useContext(AuthContext);
    const { filterWait, setFilterWait, getWait, setGetWait } = useWaits();
    const { from, setFrom, to, setTo, courseId, setCourseId, courseValue, setCourseValue, pathId, setPathId, pathValue, setPathValue, teacherId, setTeacherId, teacherValue, setTeacherValue } = useFinancialOperationsFilter();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [saleCounts, setSaleCounts] = useState('');
    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');
    const theme = useTheme();

    const calculatingPercentage = (total, profit) => {
        let value = 100 * profit / total;

        return value;
    }

    const getSales = async () => {
        let result = await Fetch(host + `/reports/sales?is_detailed=1${from  && `&from=${from}`}${to && `&to=${to}`}${courseId && `&course_id=${courseId}`}${pathId && `&path_id=${pathId}`}${teacherId && `&teacher_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setSaleCounts(result.data.data.total);
            setCurrentPage(page);
            setSales(result.data.data.data);
        }

        setGetWait(false);
    }

    const filteringSales = async () => {
        let result = await Fetch(host + `/reports/sales?is_detailed=1${from  && `&from=${from}`}${to && `&to=${to}`}${courseId && `&course_id=${courseId}`}${pathId && `&path_id=${pathId}`}${teacherId && `&teacher_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setSaleCounts(result.data.data.total);
            setCurrentPage(page);
            setSales(result.data.data.data);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        {
                            getWait ?
                                <Box className="w-4/5 h-screen relative flex justify-center items-center">
                                    <CircularProgress size={70} />
                                </Box>
                                :
                                <>
                                    <Box className="w-4/5 rounded-xl relative px-2" dir="rtl">
                                        <Box className="rounded-xl">
                                            <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                                <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">سجل العمليات المالية</Typography>
                                            </Box>
                                            <Box>
                                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir="rtl">
                                                    <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                        <Box className="w-full flex items-center">
                                                            <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => setPopup('filter', 'flex')} fontSize="large" />
                                                            <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                                <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث برقم العملية أو اسم المستخدم" />
                                                                <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                            </Box>
                                                        </Box>
                                                        <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                            <select style={{ backgroundColor: theme.palette.background.select }} onChange={(e) => setOrder(e.target.value)} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                                <option value=''>التاريخ</option>
                                                                <option value={language === 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}>رقم العملية</option>
                                                            </select>
                                                            <Typography variant="body1" className="!text-gray-500">إجمالي الطلبات: {saleCounts}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead className="bg-gray-200">
                                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                                <StyledTableCell align="right">رقم العملية</StyledTableCell>
                                                                <StyledTableCell align="right">نوع العملية</StyledTableCell>
                                                                <StyledTableCell align="right">تفاصيل العملية</StyledTableCell>
                                                                <StyledTableCell align="right">اسم الطالب</StyledTableCell>
                                                                <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                                <StyledTableCell align="right">المبلغ</StyledTableCell>
                                                                <StyledTableCell align="right">عمولة المنصة</StyledTableCell>
                                                                <StyledTableCell align="right">أرباح المدرس</StyledTableCell>
                                                                <StyledTableCell align="right">تاريخ العملية</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                sales.map((sale, index) =>
                                                                    <StyledTableRow key={index} className="h-20">
                                                                        <StyledTableCell align="right" className="">{sale.id}</StyledTableCell>
                                                                        <StyledTableCell align="right" component="th" scope="row">{sale.type === 'Course' ? 'شراء دورة' : 'شراء مسار'}</StyledTableCell>
                                                                        <StyledTableCell align="right">{language === 'en' ? sale.name_en : sale.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align="right">{sale.student}</StyledTableCell>
                                                                        <StyledTableCell align="right">{sale.teacher}</StyledTableCell>
                                                                        <StyledTableCell align="right">{sale.amount}$</StyledTableCell>
                                                                        <StyledTableCell align="right" className="!font-bold !text-blue-500">{calculatingPercentage(sale.amount, sale.admin_profit)}%</StyledTableCell>
                                                                        <StyledTableCell align="right" className="!font-bold">{sale.teacher_profit}$</StyledTableCell>
                                                                        <StyledTableCell align="right">{sale.date}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            }
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
                                    </Box>
                                </>
                        }
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center hidden max-sm:left-0">
                            <FinancialOperationsFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringSales} filterWait={filterWait} setFilterWait={setFilterWait} from={from} to={to} courseValue={courseValue} pathValue={pathValue} setCourseId={setCourseId} setCourseValue={setCourseValue} setPathId={setPathId} setFrom={setFrom} setTo={setTo} setPathValue={setPathValue} setTeacherId={setTeacherId} teacherValue={teacherValue} setTeacherValue={setTeacherValue} />
                        </Box>
                    </Box>
            }
        </>
    );
}

export default FinancialOperations;