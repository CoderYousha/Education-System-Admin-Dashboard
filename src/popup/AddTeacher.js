import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import Fetch from "../services/Fetch";
import AddIcon from '@mui/icons-material/Add';

function AddTeacher({ onClickClose, value, setValue ,setMajorId, setAcademicDegree }) {
    const language = localStorage.getItem('language');
    const theme = useTheme();

    const loadMajors = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/majors`);
        return {
            options: response.data.data.map((item) => ({
                value: item.id, label: language == 'en'? item.name_en : item.name_ar,
            })),

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    const loadAcademicDegrees = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/academic-degrees`);
        return {
            options: response.data.data.data.map((item) => ({
                value: item.id, label: language == 'en'? item.name_en : item.name_ar,
            })),

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">إضافة مدرس جديد</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Box className=""></Box>
            <Box className="grid grid-cols-2 w-full gap-x-2 gap-y-5 mt-5">
                <TextField variant="outlined" className="w-full" label="الاسم الأول" />
                <TextField variant="outlined" className="w-full" label="الاسم الأخير" />
                <Box className="">
                    <Typography variant="body1">التخصص التعليمي</Typography>
                    <AsyncPaginate
                        value={value}
                        loadOptions={loadMajors}
                        onChange={(option) => { setValue(option); setMajorId(option.value) }}
                        additional={{
                            page: 1
                        }}
                        className="mt-2 !bg-gray-200"
                        placeholder="التخصص التعليمي"
                        styles={{
                            option: (provided, state) => ({
                                ...provided,
                                color: 'black'
                            }),
                        }}
                        isSearchable={false}
                    />
                </Box>
                <Box className="">
                    <Typography variant="body1">الدرجة العلمية</Typography>
                    <AsyncPaginate
                        value={value}
                        loadOptions={loadAcademicDegrees}
                        onChange={(option) => { setValue(option); setAcademicDegree(option.value) }}
                        additional={{
                            page: 1
                        }}
                        className="mt-2 !bg-gray-200"
                        placeholder="الدرجة العلمية"
                        styles={{
                            option: (provided, state) => ({
                                ...provided,
                                color: 'black'
                            }),
                        }}
                        isSearchable={false}
                    />
                </Box>
                <TextField variant="outlined" className="w-full" label="سنوات الخبرة" />
                <TextField variant="outlined" className="w-full" label="تاريخ الميلاد" />
                <TextField variant="outlined" className="w-full" label="البريد الإلكتروني" />
                <TextField variant="outlined" className="w-full" label="الرقم" dir="ltr" />
            </Box>
            <Box className="flex justify-between mt-5 w-full">
                <Button variant="contained" className="w-5/12 !text-white !font-bold">
                    <AddIcon />
                    إضافة
                </Button>
                <Button variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default AddTeacher;