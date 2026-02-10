import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import AddIcon from '@mui/icons-material/Add';

function AddAds({ onClickClose }) {
    const language = localStorage.getItem('language');

    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:h-screen" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">إضافة إعلان جديد</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <TextField variant="outlined" label="عنوان الإعلان" className="w-full" value={"خصم خاص للطلاب 30%"} />
            <Box className="grid grid-cols-2 gap-x-2 gap-y-7 my-7 max-sm:grid-cols-1">
                <Box className="">
                    <Typography variant="body1" className="!font-semibold text-gray-400">نوع الإعلان</Typography>
                    <AsyncPaginate
                        additional={{
                            page: 1
                        }}
                        className="mt-2"
                        placeholder="نوع الإعلان"
                        styles={{
                            option: (provided) => ({
                                ...provided,
                                color: 'black'
                            }),
                        }}
                        isSearchable={false}
                    />
                </Box>
                <Box className="">
                    <Typography variant="body1" className="!font-semibold text-gray-400">الفئة / الدورة</Typography>
                    <AsyncPaginate
                        additional={{
                            page: 1
                        }}
                        className="mt-2"
                        placeholder="الفئة/الدورة"
                        styles={{
                            option: (provided) => ({
                                ...provided,
                                color: 'black'
                            }),
                        }}
                        isSearchable={false}
                    />
                </Box>
                <Box className="">
                    <Typography variant="body2" className="!font-semibold text-gray-400">تاريخ البدء</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" />
                </Box>
                <Box className="">
                    <Typography variant="body2" className="!font-semibold text-gray-400">تاريخ الإنتهاء</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" />
                </Box>
            </Box>
            <TextField variant="outlined" label="محتوى الإعلان" className="w-full" value={"استفد من الخصم على دورة أساسيات البرمجة"} />
            <Box className="mt-7">
                <Typography variant="body2" className="!font-semibold text-gray-400">الحالة</Typography>
                <select className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none">
                    <option>نشط</option>
                    <option>متوقف</option>
                    <option>منهي</option>
                </select>
            </Box>
            <Box className="flex justify-between mt-5 w-full max-sm:flex-col max-sm:items-center">
                <Button variant="contained" className="w-5/12 !text-white !font-bold max-sm:w-full">
                                <AddIcon />
                                إضافة
                </Button>
                <Button onClick={() => { onClickClose(); }} variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold max-sm:w-full max-sm:!mt-2">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default AddAds;