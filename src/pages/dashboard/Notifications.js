import { useContext, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { usePopups } from "../../hooks/UsePopups";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CourseNotificationImage from "../../images/icons/course-notification.png";
import PathNotificationImage from "../../images/icons/path-notification.png";
import UpdateNotificationImage from "../../images/icons/update-notification.png";

function Notifications() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { setPopup } = usePopups();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
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
                        <Box className="w-4/5 rounded-xl relative px-5 py-5" dir="rtl">
                            <Typography variant="h6" className="pb-3">مركز الإشعارات</Typography>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-full rounded-lg">
                                <Box className="w-full min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                    <Box className="w-full flex items-center">
                                        <FilterAltOutlinedIcon className="cursor-pointer" onClick={() => setPopup('filter', 'flex')} fontSize="large" />
                                        <Box className="w-3/4 relative mr-3 max-sm:w-full">
                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-8/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث عن إشعار ..." />
                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" className="!text-gray-500 w-1/4 max-sm:w-full">إجمالي الطلبات: 1000</Typography>
                                </Box>

                                <Box className="w-full" dir="rtl">
                                    <Box className="flex items-center py-2">
                                        <img src={CourseNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف دورة "أساسيات البرمجة" للموافقة</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={PathNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف مسار جديد "الويب"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={UpdateNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">عدل على محتوى دورة "أساسيات البرمجة"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={CourseNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف دورة "أساسيات البرمجة"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={PathNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف مسار جديد "الويب"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={UpdateNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">عدل على محتوى دورة "أساسيات البرمجة"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={CourseNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف دورة "أساسيات البرمجة"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex items-center py-2">
                                        <img src={PathNotificationImage} className="mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                                        <Box className="">
                                            <Box className="flex">
                                                <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                                <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف مسار جديد "الويب"</Typography>
                                            </Box>
                                            <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flex justify-center items-center" dir="rtl">
                                        <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                            <NavigateNextIcon fontSize="large" />
                                        </Button>
                                        <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                        <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                            <NavigateBeforeIcon fontSize="large" />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Notifications;