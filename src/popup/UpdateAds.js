import { Box, Button, Divider, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useConstants } from "../hooks/UseConstants";
import CircleIcon from '@mui/icons-material/Circle';

function UpdateAds({ onClickClose }) {
    const { language } = useConstants();
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
                <Select variant="standard" value="active" onClick={(e) => e.stopPropagation()} className="w-full !rounded-xl !border-none" sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }}>
                    <MenuItem dir="rtl" value="active" selected={true}>
                        <CircleIcon className="text-green-700" fontSize="small" /> نشط
                    </MenuItem>
                    <MenuItem dir="rtl" value="paused">
                        <CircleIcon className="text-gray-700" fontSize="small" /> متوقف
                    </MenuItem>
                    <MenuItem dir="rtl" value="ended">
                        <CircleIcon className="text-red-700" fontSize="small" /> منهي
                    </MenuItem>
                </Select>
            </Box>
            <Box className="flex justify-between mt-5 w-full max-sm:flex-col max-sm:items-center">
                <Button variant="contained" className="w-5/12 !text-white !font-bold max-sm:w-full"><SaveOutlinedIcon className="mx-2" /> حفظ</Button>
                <Button onClick={() => { onClickClose(); }} variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold max-sm:w-full max-sm:!mt-2">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default UpdateAds;