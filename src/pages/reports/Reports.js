import { useContext, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import MoneyImage from "../../images/icons/money.png";
import ArrowIncrease from "../../images/icons/arrow-increase.png";
import ArrowDecrease from "../../images/icons/arrow-decrease.png";
import Arrow from "../../images/icons/arrow.png";
import TeachersImage from "../../images/icons/teachers.png";
import BankImage from "../../images/icons/bank.png";
import WalletImage from "../../images/icons/wallet.png";
import SettingsImage from "../../images/icons/settings.png";
import WarningImage from "../../images/icons/warning.png";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useTableStyles } from "../../hooks/UseTableStyles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { usePopups } from "../../hooks/UsePopups";
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from "react-router-dom";
import { useWaits } from "../../hooks/UseWait";
import CoursesImage from '../../images/icons/courses.png';
import StarImage from '../../images/icons/star.png';
import PersonImage from '../../images/icons/person.png';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PieChartWithCenterLabel from "../../components/PieCenterLabelReports";
import StackedBarChart from "../../components/StackedBarChart";

function Reports() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { filterWait, setFilterWait } = useWaits();
    const { setPopup } = usePopups();
    const [systemProfits, setSystemProfits] = useState('');
    const [teacherProfits, setTeacherProfits] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 flex justify-between mt-10 max-sm:block" dir="rtl">
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 relative shadow-xl py-2 max-sm:w-5/6 max-sm:mx-auto">
                                <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mr-2 mt-2 text-blue-900">
                                    <img src={MoneyImage} />
                                </Box>
                                <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي المبيعات</Typography>
                                <Typography variant="h4" className="pr-2 pt-3">45200.00$</Typography>
                                <Box className="absolute top-5 left-2">
                                    <Box>
                                        <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                        <Typography variant="body2" className="text-green-500 inline-block !mr-1">12%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center text-blue-900 mr-2 mt-2">
                                    <img src={CoursesImage} />
                                </Box>
                                <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">الدورات المباعة</Typography>
                                <Typography variant="h4" className="pr-2 pt-3">1240</Typography>
                                <Box className="absolute top-5 left-2">
                                    <Box>
                                        <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                        <Typography variant="body2" className="text-green-500 inline-block !mr-1">6.2%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mr-2 mt-2 text-blue-900">
                                    <img src={StarImage} />
                                </Box>
                                <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">الدورة الأكثر مبيعا</Typography>
                                <Typography variant="h4" className="pr-2 pt-3">أساسيات البرمجة</Typography>
                                <Box className="absolute top-5 left-2">
                                    <Box>
                                        <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                        <Typography variant="body2" className="text-green-500 inline-block">6%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mr-2 mt-2 text-blue-900">
                                    <img src={PersonImage} />
                                </Box>
                                <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">أفضل مدرس</Typography>
                                <Typography variant="h4" className="pr-2 pt-3">د. أحمد الخطيب</Typography>
                                <Box className="absolute top-5 left-2">
                                    <Box>
                                        <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                        <Typography variant="body2" className="text-red-500 inline-block">4.5%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="px-2">
                            <Box dir="rtl" sx={{ backgroundColor: theme.palette.background.paper }} className="w-4/5 mt-10 rounded-xl flex items-center justify-around py-3 shadow-lg">
                                <Box className="w-1/5 max-sm:w-full">
                                    <Typography variant="body2" className="!font-semibold text-gray-400">من تاريخ</Typography>
                                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" />
                                </Box>
                                <Box className="w-1/5 max-sm:w-full">
                                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى تاريخ</Typography>
                                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" />
                                </Box>
                                <Box className="w-1/5 max-sm:w-full">
                                    <Typography variant="body2" className="!font-semibold text-gray-400">نوع التقرير</Typography>
                                    <select className="w-full mt-2 rounded-lg text-black bg-gray-200 py-1">
                                        <option className="">الكل</option>
                                        <option className="">تقرير الطلاب</option>
                                        <option className="">تقرير المدرسين</option>
                                        <option className="">تقرير المبيعات</option>
                                    </select>
                                </Box>
                                <Box className="w-1/5 max-sm:w-full">
                                    <br />
                                    <Button sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} variant="contained" className="h-10 max-sm:w-full max-sm:!mt-5 !text-white mt-2">
                                        {
                                            filterWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                <Box>
                                                    تطبيق الفلترة
                                                    <FilterAltOutlinedIcon />
                                                </Box>
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="w-4/5 h-fit px-2 flow-root">
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-4/12 my-5 rounded-xl float-left" dir="rtl">
                                <Typography variant="h6" className="!pt-2 !mr-4">توزيع العمليات حسب النوع</Typography>
                                <PieChartWithCenterLabel />
                            </Box>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-7/12 my-5 rounded-xl float-right pb-9" dir="rtl">
                                <Typography variant="h6" className="!pt-2 !mr-4">توزيع العمليات حسب النوع</Typography>
                                <StackedBarChart />
                            </Box>
                        </Box>
                        <Box className="w-4/5 mt-10">
                            <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mx-2 rounded-xl">
                                <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir="rtl">
                                    <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">مركز التقارير</Typography>
                                    <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600">تحميل كل التقارير <FileDownloadOutlinedIcon /></Typography>
                                </Box>
                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir="rtl">
                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead className="bg-gray-200">
                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                <StyledTableCell align="right">نوع التقرير</StyledTableCell>
                                                <StyledTableCell align="right">محتوى التقرير</StyledTableCell>
                                                <StyledTableCell align="right">نوع الملف</StyledTableCell>
                                                <StyledTableCell align="right">آخر تحديث للبيانات في النظام</StyledTableCell>
                                                <StyledTableCell align="right">الإجراء</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow className="h-20">
                                                <StyledTableCell align="right" className="">تقرير الطلاب</StyledTableCell>
                                                <StyledTableCell align="right" component="th" scope="row">بيانات الطلاب المسجلين في المنصة</StyledTableCell>
                                                <StyledTableCell align="right">PDF</StyledTableCell>
                                                <StyledTableCell align="right">2026-01-01</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button className="" variant="contained">
                                                        تحميل
                                                        <FileDownloadOutlinedIcon />
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow className="h-20">
                                                <StyledTableCell align="right" className="">تقرير المدرسين</StyledTableCell>
                                                <StyledTableCell align="right" component="th" scope="row">بيانات المدرسين ونشاطهم</StyledTableCell>
                                                <StyledTableCell align="right">Excel</StyledTableCell>
                                                <StyledTableCell align="right">2026-01-01</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button className="" variant="contained">
                                                        تحميل
                                                        <FileDownloadOutlinedIcon />
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow className="h-20">
                                                <StyledTableCell align="right" className="">تقرير المبيعات</StyledTableCell>
                                                <StyledTableCell align="right" component="th" scope="row">تفاصيل مبيعات الدورات والإيرادات</StyledTableCell>
                                                <StyledTableCell align="right">PDF</StyledTableCell>
                                                <StyledTableCell align="right">2026-01-01</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button className="" variant="contained">
                                                        تحميل
                                                        <FileDownloadOutlinedIcon />
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Reports;