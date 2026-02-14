import { useContext } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, Switch, Typography, useTheme } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailImage from '../../images/icons/email.png';
import PhoneImage from '../../images/icons/phone.png';
import RoleImage from '../../images/icons/roles.png';
import StudentsImage from '../../images/icons/students.png';
import TeachersImage from '../../images/icons/teachers.png';
import MoneyImage from '../../images/icons/money.png';
import ReportImage from '../../images/icons/blue_report.png';
import SecurityImage from '../../images/icons/security.png';
import ResetPasswordImage from '../../images/icons/reset-password.png';
import LanguageImage from '../../images/icons/language.png';

function Profile() {
    const { host, language } = useConstants();
    const { wait, profile } = useContext(AuthContext);
    const theme = useTheme();

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box className="w-full px-5">
                        <Box sx={{ backgroundImage: 'linear-gradient(to right, #2563EA, #85A4E8, white 80%)' }} className="h-48 py-5 px-5 rounded-xl mt-10 flex justify-between items-center shadow-lg" dir="rtl">
                            <Box className="flex items-center">
                                {
                                    profile.image ?
                                        <Box className="w-14 h-14 text-white rounded-full flex justify-center items-center">
                                            <img src={profile.image} className="w-full h-full rounded-full" />
                                        </Box>
                                        :
                                        <Box className="w-14 h-14 text-white rounded-full bg-blue-500 flex justify-center items-center">
                                            <PermIdentityIcon fontSize="large" />
                                        </Box>
                                }
                                <Box className="mr-5 flex flex-col">
                                    <Box className="flex items-center">
                                        <Typography variant="h5" fontWeight={800} className="">{profile.first_name + ' ' + profile.last_name}</Typography>
                                        <Typography variant="body2" className="!text-blue-400 w-fit h-full bg-blue-200 px-2 py-1 rounded-full !mr-3">المدير العام</Typography>
                                    </Box>
                                    <Box className="flex items-center my-5">
                                        <img src={EmailImage} className="ml-5" />
                                        <Typography variant="body2" className="!ml-5">{profile.email}</Typography>
                                        <img src={PhoneImage} className="ml-5" />
                                        <Typography variant="body2" dir="ltr" className="">{profile.phone_code + profile.phone}</Typography>
                                    </Box>
                                    <Button sx={{ backgroundImage: 'linear-gradient(to right, #85A4E8, #2563EA)' }} className="!rounded-full" variant="contained">
                                        <EditOutlinedIcon />
                                        تعديل الملف الشخصي
                                    </Button>
                                </Box>
                            </Box>
                            <Box className="h-full flex flex-col justify-between">
                                <Box>
                                    <Typography className="text-gray-400" variant="body2">عضو منذ</Typography>
                                    <Typography className="text-white" variant="body2">{profile.verified_at.split("-")[0]}</Typography>
                                </Box>
                                <Box>
                                    <Typography className="text-gray-400" variant="body2">مستوى الوصول</Typography>
                                    <Typography className="text-white" variant="body2">صلاحيات كاملة</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="" dir="rtl">
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="mt-10 w-7/12 rounded-xl px-4 py-4 float-right" dir="rtl">
                                <Box className="flex items-center">
                                    <img src={RoleImage} />
                                    <Typography variant="h6" fontWeight={800} className="!mr-2">الصلاحيات والوصول</Typography>
                                </Box>
                                <Box className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7">
                                    <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm" sx={{ boxShadow: '5px 0px 4px -3px blue' }}>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                        <Box className="flex items-center">
                                            <img src={StudentsImage} />
                                            <Box className="mr-5">
                                                <Typography variant="h6" fontWeight={800} className="">إدارة الطلاب</Typography>
                                                <Typography variant="body2" className="text-gray-500 !mt-5">إضافة، حذف وتعديل البيانات</Typography>
                                            </Box>
                                        </Box>
                                        <Switch checked={true} />
                                    </Box>
                                    <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: '5px 0px 4px -3px blue' }}>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                        <Box className="flex items-center">
                                            <img src={TeachersImage} />
                                            <Box className="mr-5">
                                                <Typography variant="h6" fontWeight={800} className="">إدارة المدرسين</Typography>
                                                <Typography variant="body2" className="text-gray-500 !mt-5">إضافة مدرس جديد، مراجعة طلبات الدورات</Typography>
                                            </Box>
                                        </Box>
                                        <Switch checked={true} />
                                    </Box>
                                    <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: '5px 0px 4px -3px blue' }}>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                        <Box className="flex items-center">
                                            <img src={MoneyImage} />
                                            <Box className="mr-5">
                                                <Typography variant="h6" fontWeight={800} className="">الإدارة المالية</Typography>
                                                <Typography variant="body2" className="text-gray-500 !mt-5">مراجعة طلبات سحب الأرباح، إدارة المدفوعات</Typography>
                                            </Box>
                                        </Box>
                                        <Switch checked={true} />
                                    </Box>
                                    <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: '5px 0px 4px -3px blue' }}>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                        <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                        <Box className="flex items-center">
                                            <img src={ReportImage} />
                                            <Box className="mr-5">
                                                <Typography variant="h6" fontWeight={800} className="">تقارير النظام</Typography>
                                                <Typography variant="body2" className="text-gray-500 !mt-5">إنشاء تقارير الطلاب والمدرسين والمبيعات</Typography>
                                            </Box>
                                        </Box>
                                        <Switch checked={true} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="mt-10 w-4/12 rounded-xl px-4 py-4 float-left" dir="rtl">
                                <Box className="flex items-center">
                                    <img src={SecurityImage} />
                                    <Typography variant="h6" fontWeight={800} className="!mr-2">الأمن والإعدادات</Typography>
                                </Box>
                                <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm mt-5" sx={{ boxShadow: '10px 0px #172554' }}>
                                    <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                    <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                    <Box className="flex items-center">
                                        <img src={ResetPasswordImage} />
                                        <Box className="mr-5">
                                            <Typography variant="h6" fontWeight={800} className="">إعادة تعيين كلمة المرور</Typography>
                                            <Typography variant="body2" className="text-gray-500 !mt-5">تحديث كلمة مرور الحساب</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm mt-5" sx={{ boxShadow: '10px 0px #172554' }}>
                                    <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                    <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                    <Box className="flex items-center">
                                        <img src={LanguageImage} />
                                        <Box className="mr-5">
                                            <Typography variant="h6" fontWeight={800} className="">لغة النظام</Typography>
                                            <Typography variant="body2" className="text-gray-500 !mt-5">تغيير لغة الواجهة</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Profile;