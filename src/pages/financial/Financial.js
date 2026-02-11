import { useContext } from "react";
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


function Financial() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const theme = useTheme();

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
                                <TextField variant="outlined" label="نسبة عمولة المنصة (%)" dir="rtl" className="w-full !my-5" />
                                <TextField variant="outlined" label="نسبة أرباح المدرس المستحقة (%)" dir="rtl" className="w-full !my-5" />
                                <Box className="w-full rounded-lg bg-blue-100 border border-blue-400 py-2 px-2 flex items-center mt-10" dir="rtl">
                                    <img src={WarningImage} className="" />
                                    <Typography variant="body1" className="text-blue-600 !mr-5">يتم احتساب حصة المدرس تلقائيا بناء على خصم عمولة المنصة من المبلغ الكلي لكل عملية بيع</Typography>
                                </Box>
                                <Button variant="contained" className="w-full !mt-8 !text-white !text-lg max-sm:w-full">حفظ التغييرات <SaveOutlinedIcon className="mx-2" /></Button>
                            </Box>
                            <Box className="w-2/3 ml-2 mt-10 flex-grow mr-5">
                                <Box sx={{ backgroundColor: theme.palette.background.default }} className="bg-white mr-2 rounded-xl">
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2 py-4 rounded-t-xl" dir="rtl">
                                        <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">طلبات الموافقة المعلقة</Typography>
                                        <Typography variant="body1" className="cursor-pointer max-sm:!text-sm text-blue-600">عرض جميع الطلبات <ArrowBackIosNewIcon /></Typography>
                                    </Box>
                                    <TableContainer sx={{borderRadius: '0'}} className="!rounded-b-xl" component={Paper} dir="rtl">
                                        <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead className="bg-gray-200">
                                                <TableRow sx={{ backgroundColor: theme.palette.background.paper }} className="!rounded-none">
                                                    <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                    <StyledTableCell align="right">الرصيد المتاح</StyledTableCell>
                                                    <StyledTableCell align="right">المبلغ المطلوب</StyledTableCell>
                                                    <StyledTableCell align="right">تاريخ الطلب</StyledTableCell>
                                                    <StyledTableCell align="right">الحالة</StyledTableCell>
                                                    <StyledTableCell align="right">الإجراءات</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow className="h-20">
                                                    <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">د. أحمد الخطيب</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">دأ</Box><Box className=""></Box></Box></StyledTableCell>
                                                    <StyledTableCell align="right" component="th" scope="row">4200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">1200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">2026-02-02</StyledTableCell>
                                                    <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: "#FCF0CF", color: "orange" }}>قيد المراجعة</Box></StyledTableCell>
                                                    <StyledTableCell align="right" className="!h-20 !flex justify-between items-center">
                                                        <Button variant="contained" className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                            رفض
                                                        </Button>
                                                        <Button variant="contained" className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                            موافقة
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow className="h-20">
                                                    <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">د. أحمد الخطيب</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">دأ</Box><Box className=""></Box></Box></StyledTableCell>
                                                    <StyledTableCell align="right" component="th" scope="row">4200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">1200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">2026-02-02</StyledTableCell>
                                                    <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: "#FCF0CF", color: "orange" }}>قيد المراجعة</Box></StyledTableCell>
                                                    <StyledTableCell align="right" className="!h-20 !flex justify-between items-center">
                                                        <Button variant="contained" className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                            رفض
                                                        </Button>
                                                        <Button variant="contained" className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                            موافقة
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow className="h-20">
                                                    <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">د. أحمد الخطيب</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">دأ</Box><Box className=""></Box></Box></StyledTableCell>
                                                    <StyledTableCell align="right" component="th" scope="row">4200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">1200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">2026-02-02</StyledTableCell>
                                                    <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: "#FCF0CF", color: "orange" }}>قيد المراجعة</Box></StyledTableCell>
                                                    <StyledTableCell align="right" className="!h-20 !flex justify-between items-center">
                                                        <Button variant="contained" className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                            رفض
                                                        </Button>
                                                        <Button variant="contained" className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                            موافقة
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow className="h-20">
                                                    <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">د. أحمد الخطيب</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">دأ</Box><Box className=""></Box></Box></StyledTableCell>
                                                    <StyledTableCell align="right" component="th" scope="row">4200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">1200.00$</StyledTableCell>
                                                    <StyledTableCell align="right">2026-02-02</StyledTableCell>
                                                    <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: "#FCF0CF", color: "orange" }}>قيد المراجعة</Box></StyledTableCell>
                                                    <StyledTableCell align="right" className="!h-20 !flex justify-between items-center">
                                                        <Button variant="contained" className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                            رفض
                                                        </Button>
                                                        <Button variant="contained" className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                            موافقة
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Financial;