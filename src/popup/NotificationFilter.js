import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function NotificationFilter({onClickClose, onClickConfirm, filterWait, setFilterWait}) {
    const theme = useTheme();

    const resetFilter = () => {

    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تصفية المدرسين</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Typography variant="body1">نوع الإشعار</Typography>
            <select className="w-full my-5 rounded-lg text-black bg-gray-200 py-1">
                <option value="">الكل</option>
            </select>
            <Typography variant="body1">حالة الإشعار</Typography>
            <select className="w-full my-5 rounded-lg text-black bg-gray-200 py-1">
                <option value="">الكل</option>
            </select>
            <Typography variant="body1">تاريخ الإشعار</Typography>
            <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" />
            <Typography variant="body1">الدورة / المسار</Typography>
            <select className="w-full my-5 rounded-lg text-black bg-gray-200 py-1">
                <option value="">الكل</option>
            </select>

            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button onClick={resetFilter} variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold hover:!bg-gray-200 duration-300 max-sm:w-full">إعادة التعيين</Button>
                <Button variant="contained" className="w-5/12 h-10 !text-white hover:bg-blue-400 duration-300 max-sm:w-full max-sm:!mt-5" onClick={async () => { setFilterWait(true); onClickConfirm(); }}>
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
    );
}

export default NotificationFilter;