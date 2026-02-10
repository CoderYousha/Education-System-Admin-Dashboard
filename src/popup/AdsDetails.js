import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AdsDetails({ onClickClose }) {
    const language = localStorage.getItem('language');

    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:h-screen" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تفاصيل الإعلان</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <TextField variant="outlined" label="عنوان الإعلان" className="w-full" value={"خصم خاص للطلاب 30%"} />
            <Box className="grid grid-cols-2 gap-x-2 gap-y-7 my-7 max-sm:grid-cols-1">
                <TextField variant="outlined" label="نوع الإعلان" className="w-full" value={"خصم"} />
                <TextField variant="outlined" label="الفئة/الدورة" className="w-full" value={"أساسيات البرمجة"} />
                <TextField variant="outlined" label="تاريخ البدء" className="w-full" value={"2026-02-01"} />
                <TextField variant="outlined" label="تاريخ الإنتهاء" className="w-full" value={"2026-02-20"} />
            </Box>
            <TextField variant="outlined" label="محتوى الإعلان" className="w-full" value={"استفد من الخصم على دورة أساسيات البرمجة"} />
            <Box className="flex justify-between my-7 max-sm:flex-col max-sm:items-center">
                <Button variant="contained" className="w-2/5 !font-bold !bg-green-300 !text-green-700 max-sm:w-full">تعديل</Button>
                <Button variant="contained" className="w-2/5 !font-bold !bg-red-300 !text-red-700 max-sm:w-full max-sm:!mt-2">حذف</Button>
            </Box>
        </Box>
    );
}

export default AdsDetails;