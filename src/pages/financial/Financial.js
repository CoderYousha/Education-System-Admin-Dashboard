import { useContext, useEffect, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, ListItemIcon, Menu, MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
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
import DeleteDialog from "../../popup/DeleteDialog";
import { usePopups } from "../../hooks/UsePopups";
import { useNavigate } from "react-router-dom";
import { useWaits } from "../../hooks/UseWait";
import Fetch from "../../services/Fetch";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";

function Financial() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { setPopup } = usePopups();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const [systemProfits, setSystemProfits] = useState('');
    const [teacherProfits, setTeacherProfits] = useState('');
    const [sales, setSales] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const visibleSales = sales.slice(0, 4);
    const visibleWithdraws = withdraws.slice(0, 4);
    const theme = useTheme();
    const navigate = useNavigate();

    const calculatingPercentage = (total, profit) => {
        let value = 100 * profit / total;

        return value;
    }

    const getSales = async () => {
        let result = await Fetch(host + '/reports/sales?is_detailed=1');

        if (result.status === 200) {
            setSales(result.data.data.data);
        }
    }

    const getAdminPercentage = async () => {
        let result = await Fetch(host + '/lists/config?keys[]=admin_percentage');

        if (result.status === 200) {
            setSystemProfits(result.data.data.admin_percentage);
            setTeacherProfits(100 - result.data.data.admin_percentage);
        }
    }

    const getWithdraws = async () => {
        let result = await Fetch(host + '/admin/profit/withdraws');

        if(result.status === 200){
            setWithdraws(result.data.data);
        }
    }

    const updatePercentage = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('admin_percentage', systemProfits);

        let result = await Fetch(host + '/admin/config/update', 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', 'تم تعديل عمولة المنصة بنجاح');
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    useEffect(() => {
        const getSequentialData = async () => {
            setGetWait(true);
            await getSales();
            await getAdminPercentage();
            await getWithdraws();
            setGetWait(false);
        }
        getSequentialData();
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
                                                <img src={BankImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي عمولة المنصة</Typography>
                                            <Typography variant="h4" className="pr-2 pt-3">12350.50$</Typography>
                                            <Box className="absolute top-5 left-2">
                                                <Box>
                                                    <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                    <Typography variant="body2" className="text-green-500 inline-block !mr-1">6.2%</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mr-2 mt-2 text-blue-900">
                                                <img src={TeachersImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي أرباح المدرسين</Typography>
                                            <Typography variant="h4" className="pr-2 pt-3">28400.00</Typography>
                                            <Box className="absolute top-5 left-2">
                                                <Box>
                                                    <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                    <Typography variant="body2" className="text-green-500 inline-block">6%</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mr-2 mt-2 text-blue-900">
                                                <img src={WalletImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">رصيد محافظ الطلاب</Typography>
                                            <Typography variant="h4" className="pr-2 pt-3">4450.25</Typography>
                                            <Box className="absolute top-5 left-2">
                                                <Box>
                                                    <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                    <Typography variant="body2" className="text-red-500 inline-block">4.5%</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="w-4/5 flex flex-row-reverse">
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-1/4 rounded-xl mt-10 mr-2 py-2 px-3">
                                            <Box className="flex justify-end items-center">
                                                <Typography variant="h6" fontWeight="800" className="!mr-2">إعدادات توزيع الإيرادات</Typography>
                                                <img src={SettingsImage} className="" />
                                            </Box>
                                            <TextField type="number" variant="outlined" label="نسبة عمولة المنصة (%)" dir="rtl" className="w-full !my-5" value={systemProfits} onChange={(e) => { setSystemProfits(e.target.value); setTeacherProfits(100 - e.target.value); }} />
                                            <TextField variant="outlined" label="نسبة أرباح المدرس المستحقة (%)" dir="rtl" className="w-full !my-5" value={teacherProfits} aria-readonly />
                                            <Box className="w-full rounded-lg bg-blue-100 border border-blue-400 py-2 px-2 flex items-center mt-10" dir="rtl">
                                                <img src={WarningImage} className="" />
                                                <Typography variant="body1" className="text-blue-600 !mr-5">يتم احتساب حصة المدرس تلقائيا بناء على خصم عمولة المنصة من المبلغ الكلي لكل عملية بيع</Typography>
                                            </Box>
                                            <Button onClick={updatePercentage} variant="contained" className="w-full !mt-8 !text-white !text-lg hover:!bg-blue-400 duration-300 max-sm:w-full">
                                                {
                                                    sendWait ?
                                                        <CircularProgress size={20} className="" color="white" />
                                                        :
                                                        <>
                                                            حفظ التغييرات
                                                            <SaveOutlinedIcon className="mx-2" />
                                                        </>
                                                }
                                            </Button>
                                        </Box>
                                        <Box className="w-2/3 ml-2 mt-10 flex-grow mr-5">
                                            <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mr-2 rounded-xl">
                                                <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir="rtl">
                                                    <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">سجل الأرباح</Typography>
                                                    <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600" onClick={() => navigate('withdrawal-requests')}>عرض السجل كامل <ArrowBackIosNewIcon /></Typography>
                                                </Box>
                                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir="rtl">
                                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead className="bg-gray-200">
                                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                                <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                                <StyledTableCell align="right">الرصيد المتاح</StyledTableCell>
                                                                <StyledTableCell align="right">التاريخ</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                visibleWithdraws.map((withdraw, index) =>
                                                                    <StyledTableRow key={index} className="h-20">
                                                                        <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">{withdraw.user.first_name + ' ' + withdraw.user.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{withdraw.user.first_name.charAt(0) + withdraw.user.last_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                        <StyledTableCell align="right" component="th" scope="row">{withdraw.amount}$</StyledTableCell>
                                                                        <StyledTableCell align="right">{withdraw.created_at.split(" ")[0]}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="w-4/5 mt-5">
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mx-2 rounded-xl">
                                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir="rtl">
                                                <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">سجل العمليات المالية</Typography>
                                                <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600" onClick={() => navigate('financial-operations')}>عرض جميع الطلبات <ArrowBackIosNewIcon /></Typography>
                                            </Box>
                                            <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir="rtl">
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
                                                            visibleSales.map((sale, index) =>
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
                                            </TableContainer>
                                        </Box>
                                    </Box>
                                </>
                        }
                        <Box id="delete" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <DeleteDialog onClickCancel={() => setPopup('delete', 'none')} title="تأكيد رفض طلب السحب" subtitle="أنت على وشك رفض طلب سحب الأرباح لهذا المدرس، يرجى التأكد من صحة القرار قبل المتابعة." hasInput={true} placeholder="اكتب سبب الرفض هنا..." warning="سيتم إشعار المدرس بسبب الرفض فور التأكيد" label="سبب الرفض" />
                        </Box>
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Financial;