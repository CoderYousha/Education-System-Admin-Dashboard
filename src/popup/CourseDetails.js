import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReportImage from '../images/icons/blue_report.png';
import CoursesImage from '../images/icons/courses.png';
import PersonImage from '../images/icons/person.png';
import CategoryImage from '../images/icons/category.png';
import PathImage from '../images/icons/path.png';
import BlueCalendarImage from '../images/icons/blue_calendar.png';
import FilesImage from '../images/icons/files.png';
import PlayImage from '../images/icons/play.png';
import GrayVideoImage from '../images/icons/gray_video.png';
import CalendarImage from '../images/icons/calendar.png';
import ViewImage from '../images/icons/view.png';

function CourseDetails({ data, onClickClose }) {
    const language = localStorage.getItem('language');
    const contents = data.course?.contents?.filter((content) => content.content_type === 'CourseFile');
    const theme = useTheme();

    const getVideoSize = async (url) => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            const size = response.headers.get("Content-Length");
            if (!size) return null;
            const sizeInMB = (size / (1024 * 1024)).toFixed(2); alert(sizeInMB); return sizeInMB;
        } catch (error) {
            console.error("Error fetching video size:", error);
            return null;
        }
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-4/5 h-screen bg-white rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تفاصيل الطلب</Typography>
            <Typography variant="h6" className="text-gray-400 !mt-3 max-sm:!text-lg">مراجعة ملفات الدورة المقدمة من المعلم</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Box className="flex py-3">
                <img src={ReportImage} />
                <Typography variant="h5" className="!font-semibold !mr-2 max-sm:!text-xl">معلومات الطلب</Typography>
            </Box>
            <Box className="mt-7 grid grid-cols-3 gap-x-3 gap-y-5 max-sm:grid-cols-1">
                <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                    <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                        <img src={CoursesImage} className="" />
                    </Box>
                    <Box className="mt-4 mr-2 float-right">
                        <Typography variant="body1" className="text-gray-400">اسم الدورة</Typography>
                        <Typography variant="h6" className="!mt-4 !font-semibold">{language == 'en' ? data.course?.name_en : data.course?.name_ar}</Typography>
                    </Box>
                </Box>
                <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                    <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                        <img src={PersonImage} className="" />
                    </Box>
                    <Box className="mt-4 mr-2 float-right">
                        <Typography variant="body1" className="text-gray-400">اسم المدرس</Typography>
                        <Typography variant="h6" className="!mt-4 !font-semibold">{data.course?.teacher?.first_name + ' ' + data.course?.teacher?.last_name}</Typography>
                    </Box>
                </Box>
                <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                    <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                        <img src={CategoryImage} className="" />
                    </Box>
                    <Box className="mt-4 mr-2 float-right">
                        <Typography variant="body1" className="text-gray-400">الفئة</Typography>
                        <Typography variant="h6" className="!mt-4 !font-semibold">{language == 'en' ? data.course?.category?.name_en : data.course?.category?.name_ar}</Typography>
                    </Box>
                </Box>
                {
                    data.path &&
                    <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                        <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                            <img src={PathImage} className="" />
                        </Box>
                        <Box className="mt-4 mr-2 float-right">
                            <Typography variant="body1" className="text-gray-400">المسار التعليمي</Typography>
                            <Typography variant="h6" className="!mt-4 !font-semibold">{language == 'en' ? data.path?.name_en : data.path?.name_ar}</Typography>
                        </Box>
                    </Box>
                }
                <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                    <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                        <img src={FilesImage} className="" />
                    </Box>
                    <Box className="mt-4 mr-2 float-right">
                        <Typography variant="body1" className="text-gray-400">عدد ملفات الدورة</Typography>
                        <Typography variant="h6" className="!mt-4 !font-semibold">{contents?.length}</Typography>
                    </Box>
                </Box>
                <Box className="h-28 shadow-lg rounded-xl overflow-hidden">
                    <Box sx={{ backgroundColor: "#E8EEFD" }} className="w-1/4 h-full float-right flex justify-center items-center">
                        <img src={BlueCalendarImage} className="" />
                    </Box>
                    <Box className="mt-4 mr-2 float-right">
                        <Typography variant="body1" className="text-gray-400">تاريخ النشر</Typography>
                        <Typography variant="h6" className="!mt-4 !font-semibold">{data.course?.created_at.split(" ")[0]}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="flex pt-7 pb-8">
                <img src={FilesImage} />
                <Typography variant="h5" className="!font-semibold !mr-2 max-sm:!text-xl">الملفات المرفوعة</Typography>
            </Box>
            {
                contents?.map((content, index) =>
                    <Box key={index} className="w-full h-28 rounded-xl shadow-lg overflow-hidden mt-4 max-sm:min-h-20">
                        <Box className="w-1/4 h-full float-right relative max-sm:w-2/4">
                            <img src={content.content.thumbnail_url} className="w-full h-full" />
                            <img src={PlayImage} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </Box>
                        <Box className="h-full py-4 px-5 flex flex-col justify-between max-sm:py-1">
                            <Typography variant="body1" className="!font-semibold">{language == 'en' ? content.content.name_en : content.content.name_ar}</Typography>
                            <Box className="flex justify-between text-gray-400 max-sm:flex-col">
                                <Box className="flex items-center">
                                    <img src={GrayVideoImage} className="ml-1" />
                                    <Typography variant="body1" className="">فيديو</Typography>
                                </Box>
                                <Box className="flex items-center">
                                    <img src={CalendarImage} className="ml-1" />
                                    <Typography variant="body1" className="">{content.content.created_at.split(" ")[0]}</Typography>
                                </Box>
                                <Box className="flex items-center cursor-pointer">
                                    <img src={ViewImage} className="ml-1" />
                                    <Typography variant="body1" className="">معاينة الفيديو</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </Box>
    );
}

export default CourseDetails;