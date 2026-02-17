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
import WithdrawalRequestsFilter from "../../popup/WithdrawalRequestsFilter";
import { useWaits } from "../../hooks/UseWait";
import DeleteDialog from "../../popup/DeleteDialog";
import Fetch from "../../services/Fetch";
import { useWithdrawFilter } from "../../filter/UseWithdrawFilter";

function ProfitWithdrawalRequests() {
    const { language, host } = useConstants();
    const { setPopup } = usePopups();
    const { wait } = useContext(AuthContext);
    const { filterWait, setFilterWait, getWait, setGetWait } = useWaits();
    const { from, setFrom, to, setTo, teacherId, setTeacherId, teacherValue, setTeacherValue } = useWithdrawFilter();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [withdrawCounts, setWithdrawCounts] = useState('');
    const [withdraws, setWithdraws] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');
    const theme = useTheme();

    const getWithdraws = async () => {
        let result = await Fetch(host + `/admin/profit/withdraws?page=${page+1}${from  && `&from=${from}`}${to && `&to=${to}`}${teacherId && `&user_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setWithdrawCounts(result.data.pagination.total);
            setCurrentPage(page);
            setWithdraws(result.data.data);
        }

        setGetWait(false);
    }

    const filteringWithdraw = async () => {
        let result = await Fetch(host + `/admin/profit/withdraws?page=${page+1}${from  && `&from=${from}`}${to && `&to=${to}`}${teacherId && `&user_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.pagination.last_page);
            setWithdrawCounts(result.data.pagination.total);
            setCurrentPage(page);
            setWithdraws(result.data.data);
            setPopup('filter', 'none');
        }
        
        setFilterWait(false);
    }

    useEffect(() => {
        getWithdraws();
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
                                                <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">سجل الأرباح</Typography>
                                            </Box>
                                            <Box>
                                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir="rtl">
                                                    <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                        <Box className="w-full flex items-center">
                                                            <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => setPopup('filter', 'flex')} fontSize="large" />
                                                            <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                                <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-8/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث باسم المدرس" />
                                                                <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                            </Box>
                                                        </Box>
                                                        <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                            <select style={{ backgroundColor: theme.palette.background.select }} onChange={(e) => setOrder(e.target.value)} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                                <option value=''>التاريخ</option>
                                                                <option value={language === 'en' ? 'order_by=name_en&direction=asc' : 'order_by=name_ar&direction=asc'}>المبلغ</option>
                                                            </select>
                                                            <Typography variant="body1" className="!text-gray-500">إجمالي السجل: {withdrawCounts}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead className="bg-gray-200">
                                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                                <StyledTableCell align="right">رقم السجل</StyledTableCell>
                                                                <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                                <StyledTableCell align="right">الرصيد المتاح</StyledTableCell>
                                                                <StyledTableCell align="right">التاريخ</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                withdraws.map((withdraw, index) =>
                                                                    <StyledTableRow key={index} className="h-20">
                                                                        <StyledTableCell align="right" component="th" scope="row">{withdraw.id}</StyledTableCell>
                                                                        <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">{withdraw.user.first_name + ' ' + withdraw.user.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{withdraw.user.first_name.charAt(0) + withdraw.user.last_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                        <StyledTableCell align="right" component="th" scope="row">{withdraw.amount}$</StyledTableCell>
                                                                        <StyledTableCell align="right">{withdraw.created_at.split(' ')[0]}</StyledTableCell>
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
                            <WithdrawalRequestsFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringWithdraw} filterWait={filterWait} setFilterWait={setFilterWait} from={from} to={to} teachrrId={teacherId} teacherValue={teacherValue} setFrom={setFrom} setTo={setTo} setTeacherId={setTeacherId} setTeacherValue={setTeacherValue} />
                        </Box>
                        <Box id="delete" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <DeleteDialog onClickCancel={() => setPopup('delete', 'none')} title="تأكيد رفض طلب السحب" subtitle="أنت على وشك رفض طلب سحب الأرباح لهذا المدرس، يرجى التأكد من صحة القرار قبل المتابعة." hasInput={true} placeholder="اكتب سبب الرفض هنا..." warning="سيتم إشعار المدرس بسبب الرفض فور التأكيد" label="سبب الرفض" />
                        </Box>
                    </Box>
            }
        </>
    );
}

export default ProfitWithdrawalRequests;