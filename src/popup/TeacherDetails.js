import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function TeacherDetails({ onClickClose, teacher }) {
    const language = localStorage.getItem('language');
    const today = new Date();
    const birth_date = new Date(teacher.birth_date);

    let age = today.getFullYear() - birth_date.getFullYear();

    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تفاصيل المدرس</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <Box className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-5 flex justify-center items-center text-gray-500 text-2xl font-bold">{teacher.first_name?.charAt(0) + '' + teacher.last_name?.charAt(0)}</Box>
            <TextField variant="outlined" label="اسم المدرس" className="w-full" value={teacher.first_name + ' ' + teacher.last_name} />
            <TextField variant="outlined" className="w-full !mt-5" label="الإختصاص" value={language == 'en' ? teacher.major?.name_en : teacher.major?.name_ar} />
            <Box className="grid grid-cols-2 w-full gap-x-2 gap-y-5 mt-5">
                <TextField variant="outlined" className="w-full" label="التخصص التعليمي" value={teacher.major?.level == 'school' ? 'التعليم المدرسي' : 'التعليم الجامعي'} />
                <TextField variant="outlined" className="w-full" label="الدرجة التعليمية" value={language == 'en' ? teacher.academic_degree?.name_en : teacher.academic_degree?.name_ar} />
                <TextField variant="outlined" className="w-full" label="سنوات الخبرة" />
                <TextField variant="outlined" className="w-full" label="العمر" value={age} />
                <TextField variant="outlined" className="w-full" label="البريد الإلكتروني" value={teacher.email} />
                <TextField variant="outlined" className="w-full" label="الرقم" value={teacher.phone_code + ' ' + teacher.phone} dir="ltr" />
            </Box>
        </Box>
    );
}

export default TeacherDetails;