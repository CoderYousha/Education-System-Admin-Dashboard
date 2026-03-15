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
import { usePopups } from "../../hooks/UsePopups";
import { useNavigate } from "react-router-dom";
import { useWaits } from "../../hooks/UseWait";
import Fetch from "../../services/Fetch";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";
import { FormattedMessage } from "react-intl";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

function Financial() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setPopup } = usePopups();
    const { wait } = useContext(AuthContext);
    const { host, language } = useConstants();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const [systemProfits, setSystemProfits] = useState('');
    const [teacherProfits, setTeacherProfits] = useState('');
    const [sales, setSales] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const [cards, setCards] = useState('');
    const visibleSales = sales.slice(0, 4);
    const visibleWithdraws = withdraws.slice(0, 4);

    {/* Calculating Percentage Function */}
    const calculatingPercentage = (total, profit) => {
        let value = 100 * profit / total;

        return value;
    }

    {/* Get Sales Function */}
    const getSales = async () => {
        let result = await Fetch(host + '/reports/sales?is_detailed=1');

        if (result.status === 200) {
            setSales(result.data.data[0].data);
            setCards(result.data.data[1]);
        }
    }

    {/* Get Admin Profit Percentage Function */}
    const getAdminPercentage = async () => {
        let result = await Fetch(host + '/lists/config?keys[]=admin_percentage');

        if (result.status === 200) {
            setSystemProfits(result.data.data.admin_percentage);
            setTeacherProfits(100 - result.data.data.admin_percentage);
        }
    }

    {/* Get Withdraws Function */}
    const getWithdraws = async () => {
        let result = await Fetch(host + '/admin/profit/withdraws');

        if (result.status === 200) {
            setWithdraws(result.data.data);
        }
    }

    {/* Update Percentage Function */}
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
                                <Box className="w-4/5 h-screen relative flex justify-center items-center" sx={{float: language === 'en' && 'right'}}>
                                    <CircularProgress size={70} />
                                </Box>
                                :
                                <>
                                    {/* Financial Percentage Cards */}
                                    <Box className="w-4/5 flex justify-between mt-10 max-sm:block" sx={{float: language === 'en' && 'right'}} dir={language === 'en' ? 'ltr' : "rtl"}>
                                        {/* Total Sales Card */}
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 relative shadow-xl py-2 max-sm:w-5/6 max-sm:mx-auto">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mx-2 mt-2 text-blue-900">
                                                <img src={MoneyImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id="total_sales" /></Typography>
                                            <Typography variant="h4" className="px-2 pt-3">{cards.total_sales.total}$</Typography>
                                            <Box className="absolute top-5 left-2" sx={{ left: language === 'en' && '80%' }}>
                                                {
                                                    cards.total_sales.percent > 0 ?
                                                        <Box>
                                                            <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                            <Typography variant="body2" className="text-green-500 inline-block !mr-1">+{cards.total_sales.percent}%</Typography>
                                                        </Box>
                                                        :
                                                        cards.total_sales.percent < 0 ?
                                                            <Box>
                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-red-500 inline-block !mr-1">-{cards.total_sales.percent}%</Typography>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                <img src={Arrow} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-gray-500 inline-block !mr-1">{cards.total_sales.percent}%</Typography>
                                                            </Box>
                                                }
                                            </Box>
                                        </Box>

                                        {/* Total Platform Commission Card */}
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center text-blue-900 mx-2 mt-2">
                                                <img src={BankImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id="total_platform_commission" /></Typography>
                                            <Typography variant="h4" className="px-2 pt-3">{cards.total_admin_revenue.total}$</Typography>
                                            <Box className="absolute top-5 left-2" sx={{ left: language === 'en' && '80%' }}>
                                                {
                                                    cards.total_admin_revenue.percent > 0 ?
                                                        <Box>
                                                            <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                            <Typography variant="body2" className="text-green-500 inline-block !mr-1">+{cards.total_admin_revenue.percent}%</Typography>
                                                        </Box>
                                                        :
                                                        cards.total_admin_revenue.percent < 0 ?
                                                            <Box>
                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-red-500 inline-block !mr-1">-{cards.total_admin_revenue.percent}%</Typography>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                <img src={Arrow} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-gray-500 inline-block !mr-1">{cards.total_admin_revenue.percent}%</Typography>
                                                            </Box>
                                                }
                                            </Box>
                                        </Box>

                                        {/* Total Teachers Earnings Card */}
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mx-2 mt-2 text-blue-900">
                                                <img src={TeachersImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id="total_teacher_earnings" /></Typography>
                                            <Typography variant="h4" className="px-2 pt-3">{cards.total_teacher_revenue.total}$</Typography>
                                            <Box className="absolute top-5 left-2" sx={{ left: language === 'en' && '80%' }}>
                                                {
                                                    cards.total_teacher_revenue.percent > 0 ?
                                                        <Box>
                                                            <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                            <Typography variant="body2" className="text-green-500 inline-block !mr-1">+{cards.total_teacher_revenue.percent}%</Typography>
                                                        </Box>
                                                        :
                                                        cards.total_teacher_revenue.percent < 0 ?
                                                            <Box>
                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-red-500 inline-block !mr-1">-{cards.total_teacher_revenue.percent}%</Typography>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                <img src={Arrow} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-gray-500 inline-block !mr-1">{cards.total_teacher_revenue.percent}%</Typography>
                                                            </Box>
                                                }
                                            </Box>
                                        </Box>

                                        {/* Student Platform Balance Card */}
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 min-h-32 py-2 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                            <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center mx-2 mt-2 text-blue-900">
                                                <img src={WalletImage} />
                                            </Box>
                                            <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id="student_wallets" /></Typography>
                                            <Typography variant="h4" className="px-2 pt-3">{cards.total_student_wallets.total}$</Typography>
                                            <Box className="absolute top-5 left-2" sx={{ left: language === 'en' && '80%' }}>
                                                {
                                                    cards.total_student_wallets.percent > 0 ?
                                                        <Box>
                                                            <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                            <Typography variant="body2" className="text-green-500 inline-block !mr-1">+{cards.total_student_wallets.percent}%</Typography>
                                                        </Box>
                                                        :
                                                        cards.total_student_wallets.percent < 0 ?
                                                            <Box>
                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-red-500 inline-block !mr-1">-{cards.total_student_wallets.percent}%</Typography>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                <img src={Arrow} className="w-4 h-4 inline-block mr-2" />
                                                                <Typography variant="body2" className="text-gray-500 inline-block !mr-1">{cards.total_student_wallets.percent}%</Typography>
                                                            </Box>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>


                                    <Box className="w-4/5 flex flex-row-reverse" sx={{ flexDirection: language === 'en' && 'row', float: language === 'en' && 'right' }} dir={language === 'en' ? 'ltr' : "rtl"}>
                                        {/* Revenue Distribution Settings */}
                                        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-1/4 rounded-xl mt-10 mr-2 py-2 px-3">
                                            <Box className="flex justify-end items-center" sx={{ flexDirection: language === 'en' && 'row-reverse' }}>
                                                <Typography variant="h6" fontWeight="800" className="!mx-2"><FormattedMessage id="revenue_distribution_settings" /></Typography>
                                                <img src={SettingsImage} className="" />
                                            </Box>
                                            <TextField type="number" variant="outlined" label={<FormattedMessage id="platform_commission_percentage" />} dir={language === 'en' ? 'ltr' : "rtl"} className="w-full !my-5" value={systemProfits} onChange={(e) => { setSystemProfits(e.target.value); setTeacherProfits(100 - e.target.value); }} />
                                            <TextField variant="outlined" label={<FormattedMessage id="teachers_earnings_percentage" />} dir={language === 'en' ? 'ltr' : "rtl"} className="w-full !my-5" value={teacherProfits} aria-readonly />
                                            <Box className="w-full rounded-lg bg-blue-100 border border-blue-400 py-2 px-2 flex items-center mt-10" dir={language === 'en' ? 'ltr' : "rtl"}>
                                                <img src={WarningImage} className="" />
                                                <Typography variant="body1" className="text-blue-600 !mx-5"><FormattedMessage id="revenue_distribution_settings_note" /></Typography>
                                            </Box>
                                            <Button onClick={updatePercentage} variant="contained" className="w-full !mt-8 !text-white !text-lg hover:!bg-blue-400 duration-300 max-sm:w-full">
                                                {
                                                    sendWait ?
                                                        <CircularProgress size={20} className="" color="white" />
                                                        :
                                                        <>
                                                            <FormattedMessage id="save_changes" />
                                                            <SaveOutlinedIcon className="mx-2" />
                                                        </>
                                                }
                                            </Button>
                                        </Box>

                                        {/* Earnings Records */}
                                        <Box className="w-2/3 ml-2 mt-10 flex-grow mr-5" dir={language === 'en' ? 'ltr' : "rtl"}>
                                            <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mr-2 rounded-xl">
                                                <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir={language === 'en' ? 'ltr' : "rtl"}>
                                                    <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id="earnings_record" /></Typography>
                                                    <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600" onClick={() => navigate('withdrawal-requests')}><FormattedMessage id="view_record" />
                                                        {
                                                            language === 'en' ?
                                                            <ArrowForwardIosOutlinedIcon />
                                                            :
                                                            <ArrowBackIosNewIcon />
                                                        }
                                                    </Typography>
                                                </Box>
                                                <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                    <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead className="bg-gray-200">
                                                            <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="teacher_name" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="available_balance" /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id="date" /></StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                visibleWithdraws.map((withdraw, index) =>
                                                                    <StyledTableRow key={index} className="h-20">
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mx-2">{withdraw.user.first_name + ' ' + withdraw.user.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{withdraw.user.first_name.charAt(0) + withdraw.user.last_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">{withdraw.amount}$</StyledTableCell>
                                                                        <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{withdraw.created_at.split(" ")[0]}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Records of Financial Transactions */}
                                    <Box className="w-4/5 mt-5" dir={language === 'en' ? 'ltr' : "rtl"} sx={{float: language === 'en' && 'right'}}>
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mx-2 rounded-xl">
                                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir={language === 'en' ? 'ltr' : "rtl"}>
                                                <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id="record_financial_transactions" /></Typography>
                                                <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600" onClick={() => navigate('financial-operations')}><FormattedMessage id="view_record" />
                                                    {
                                                        language === 'en' ?
                                                            <ArrowForwardIosOutlinedIcon />
                                                            :
                                                            <ArrowBackIosNewIcon />
                                                    }
                                                </Typography>
                                            </Box>
                                            <TableContainer sx={{ borderRadius: '0' }} className="!rounded-b-xl" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="transaction_id" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="transaction_type" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="transaction_details" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="student_name" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="teacher_name" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="amount" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="platform_commission" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="teacher_earnings" /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : "right"}><FormattedMessage id="transaction_date" /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            visibleSales.map((sale, index) =>
                                                                <StyledTableRow key={index} className="h-20">
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"} className="">{sale.id}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"} component="th" scope="row">{sale.type === 'Course' ? 'شراء دورة' : 'شراء مسار'}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"}>{language === 'en' ? sale.name_en : sale.name_ar}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"}>{sale.student}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"}>{sale.teacher}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"}>{sale.amount}$</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"} className="!font-bold !text-blue-500">{calculatingPercentage(sale.amount, sale.admin_profit)}%</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"} className="!font-bold">{sale.teacher_profit}$</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? 'left' : "right"}>{sale.date}</StyledTableCell>
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

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Financial;