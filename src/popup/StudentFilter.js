import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function StudentFilter({ onClickClose }) {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تصفية الطلاب</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Typography variant="body1" className="!font-semibold text-gray-400">الإختصاص</Typography>
            <Box className="">
                <AsyncPaginate
                    className="mt-2 !bg-gray-200"
                    placeholder="اختر الإختصاص"
                />
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">عدد الدورات المسجلة</Typography>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من</Typography>
                    <input type="number" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" value="1" />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى</Typography>
                    <input type="number" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" value="5" />
                </Box>
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">تاريخ التسجيل</Typography>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من تاريخ</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" value="2025-07-12" />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى تاريخ</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" value="2025-07-12" />
                </Box>
            </Box>
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold max-sm:w-full">إعادة التعيين</Button>
                <Button variant="contained" className="w-5/12 h-10 max-sm:w-full max-sm:!mt-5">
                <Box sx={{ color: theme.palette.mode == 'dark' ? 'white' : 'black' }}>
                    تطبيق الفلترة
                    <FilterAltOutlinedIcon />
                </Box>
                </Button>
            </Box>
        </Box>
    );
}

export default StudentFilter;