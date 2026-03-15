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
import { FormattedMessage, useIntl } from "react-intl";
import { useSearch } from "../../hooks/UseSearch";
import { usePagination } from "../../hooks/UsePagination";

function FinancialOperations() {
    const intil = useIntl();
    const theme = useTheme();
    const { wait } = useContext(AuthContext);
    const { setPopup } = usePopups();
    const { language, host } = useConstants();
    const { search, setSearch, order, setOrder } = useSearch();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { filterWait, setFilterWait, getWait, setGetWait } = useWaits();
    const { from, setFrom, to, setTo, courseId, setCourseId, courseValue, setCourseValue, pathId, setPathId, pathValue, setPathValue, teacherId, setTeacherId, teacherValue, setTeacherValue } = useFinancialOperationsFilter();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const [saleCounts, setSaleCounts] = useState('');
    const [sales, setSales] = useState([]);

    {/* Calculating Percentage Function */ }
    const calculatingPercentage = (total, profit) => {
        let value = 100 * profit / total;

        return value;
    }

    {/* Get Sales Function */ }
    const getSales = async () => {
        let result = await Fetch(host + `/reports/sales?is_detailed=1${order}${search && `&search=${search}`}${from && `&from=${from}`}${to && `&to=${to}`}${courseId && `&course_id=${courseId}`}${pathId && `&path_id=${pathId}`}${teacherId && `&teacher_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.data[0].last_page);
            setSaleCounts(result.data.data[0].total);
            setCurrentPage(page);
            setSales(result.data.data[0].data);
        }

        setGetWait(false);
    }

    {/* Filtering Sales Function */ }
    const filteringSales = async () => {
        let result = await Fetch(host + `/reports/sales?is_detailed=1${order}${order}${search && `&search=${search}`}${from && `&from=${from}`}${to && `&to=${to}`}${courseId && `&course_id=${courseId}`}${pathId && `&path_id=${pathId}`}${teacherId && `&teacher_id=${teacherId}`}`);

        if (result.status === 200) {
            setTotalPages(result.data.data[0].last_page);
            setSaleCounts(result.data.data[0].total);
            setCurrentPage(page);
            setSales(result.data.data[0].data);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    useEffect(() => {
        getSales();
    }, [order, search]);

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
                                    <Box className="w-4/5 rounded-xl relative px-2" dir={language === 'en' ? 'ltr' : 'rtl'}>
                                        <Box className="rounded-xl">
                                            <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                                <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id="record_financial_transactions" /></Typography>
                                            </Box>
                                            <Box>
                                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir={language === 'en' ? 'ltr' : 'rtl'}>
                                                    {/* Top Table */}
                                                    <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                        <Box className="w-full flex items-center">
                                                            <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => setPopup('filter', 'flex')} fontSize="large" />
                                                            <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                                <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intil.formatMessage({ id: 'search_transaction' })} />
                                                                <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                            </Box>
                                                        </Box>
                                                        <Box className="flex w-2/4 items-center max-sm:w-full max-sm:mt-2 max-sm:justify-between">
                                                            <select style={{ backgroundColor: theme.palette.background.select }} onChange={(e) => setOrder(e.target.value)} className="w-2/5 py-1 rounded-lg mx-3 outline-none">
                                                                <option value=''><FormattedMessage id="date" /></option>
                                                                <option value='&order_by=id&direction=asc'><FormattedMessage id="transaction_id" /></option>
                                                            </select>
                                                            <Typography variant="body1" className="!text-gray-500"><FormattedMessage id="total_record" />: {saleCounts}</Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Financial Operations Table */}
                                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead className="bg-gray-200">
                                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="transaction_id" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="transaction_type" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="transaction_details" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="student_name" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="teacher_name" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="amount" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="platform_commission" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="teacher_earnings" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="transaction_date" /></StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                sales.map((sale, index) =>
                                                                    <StyledTableRow key={index} className="h-20">
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{sale.id}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">{sale.type === 'Course' ? 'شراء دورة' : 'شراء مسار'}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{language === 'en' ? sale.name_en : sale.name_ar}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{sale.student}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{sale.teacher}</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{sale.amount}$</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!font-bold !text-blue-500">{calculatingPercentage(sale.amount, sale.admin_profit)}%</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!font-bold">{sale.teacher_profit}$</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{sale.date}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            }
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
                                    </Box>
                                </>
                        }

                        {/* Financial Operations Filter Popup */}
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center items-center hidden max-sm:left-0">
                            <FinancialOperationsFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringSales} filterWait={filterWait} setFilterWait={setFilterWait} from={from} to={to} courseValue={courseValue} pathValue={pathValue} setCourseId={setCourseId} setCourseValue={setCourseValue} setPathId={setPathId} setFrom={setFrom} setTo={setTo} setPathValue={setPathValue} setTeacherId={setTeacherId} teacherValue={teacherValue} setTeacherValue={setTeacherValue} />
                        </Box>
                    </Box>
            }
        </>
    );
}

export default FinancialOperations;