import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import { useConstants } from "../hooks/UseConstants";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Fetch from "../services/Fetch";
import { AsyncPaginate } from "react-select-async-paginate";

function FinancialOperationsFilter({ onClickClose, onClickConfirm, filterWait, setFilterWait, from, setFrom, to, setTo, courseValue, setCourseValue, setCourseId, pathValue, setPathValue, setPathId, setTeacherId, teacherValue, setTeacherValue }) {
    const { language, host } = useConstants();
    const theme = useTheme();

    const resetFilter = () => {
        setCourseValue({ value: '', label: 'الكل' });
        setPathValue({ value: '', label: 'الكل' });
        setTeacherValue({ value: '', label: 'الكل' });
        setCourseId('');
        setPathId('');
        setTeacherId('');
        setFrom('');
        setTo('');
    }

    const loadCourses = async (search, loadedOptions, { page }) => {
        const response = await Fetch(host + `/courses?page=${page}`);
        const optionsFromApi = response.data.data.map((item) => ({ value: item.id, label: language === 'en' ? item.name_en : item.name_ar, }));
        const options =
            page === 1
                ? [{ value: '', label: 'الكل' }, ...optionsFromApi]
                : optionsFromApi;
        return {
            options,

            hasMore: response.data.pagination.current_page * response.data.pagination.perPage < response.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const loadPaths = async (search, loadedOptions, { page }) => {
        const response = await Fetch(host + `/paths?page=${page}`);
        const optionsFromApi = response.data.data.map((item) => ({ value: item.id, label: language === 'en' ? item.name_en : item.name_ar, }));
        const options =
            page === 1
                ? [{ value: '', label: 'الكل' }, ...optionsFromApi]
                : optionsFromApi;
        return {
            options,

            hasMore: response.data.pagination.current_page * response.data.pagination.perPage < response.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const loadTeachers = async (search, loadedOptions, { page }) => {
        const response = await Fetch(host + `/admin/users?account_role=teacher&page=${page}`);
        const optionsFromApi = response.data.data.data.map((item) => ({ value: item.id, label: item.first_name + ' ' + item.last_name, }));
        const options =
            page === 1
                ? [{ value: '', label: 'الكل' }, ...optionsFromApi]
                : optionsFromApi;

        return {
            options,

            hasMore: response.data.data.current_page * response.data.data.per_page < response.data.data.total, additional: { page: page + 1, },
        };
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تصفية سجل العمليات المالية</Typography>
            <CloseIcon onClick={() => { onClickClose(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">الدورة</Typography>
            <AsyncPaginate
                value={courseValue}
                loadOptions={loadCourses}
                onChange={(option) => { setCourseValue(option); setCourseId(option.value) }}
                additional={{
                    page: 1
                }}
                styles={{
                    option: (provided, state) => ({
                        ...provided,
                        color: 'black'
                    }),
                }}
                className="mt-2 !bg-gray-200"
                placeholder="اختر دورة"
                isSearchable={false}
            />
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">المسار</Typography>
            <AsyncPaginate
                value={pathValue}
                loadOptions={loadPaths}
                onChange={(option) => { setPathValue(option); setPathId(option.value) }}
                additional={{
                    page: 1
                }}
                styles={{
                    option: (provided, state) => ({
                        ...provided,
                        color: 'black'
                    }),
                }}
                className="mt-2 !bg-gray-200"
                placeholder="اختر المسار"
                isSearchable={false}
            />
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">المدرس</Typography>
            <AsyncPaginate
                value={teacherValue}
                loadOptions={loadTeachers}
                onChange={(option) => { setTeacherValue(option); setTeacherId(option.value) }}
                additional={{
                    page: 1
                }}
                styles={{
                    option: (provided, state) => ({
                        ...provided,
                        color: 'black'
                    }),
                }}
                className="mt-2 !bg-gray-200"
                placeholder="اختر المدرس"
                isSearchable={false}
            />
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من تاريخ</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={from} onChange={(e) => setFrom(e.target.value)} />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى تاريخ</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={to} onChange={(e) => setTo(e.target.value)} />
                </Box>
            </Box>
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button onClick={resetFilter} variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold hover:!bg-gray-200 duration-300 max-sm:w-full">إعادة التعيين</Button>
                <Button variant="contained" className="w-5/12 h-10 max-sm:w-full max-sm:!mt-5 !text-white hover:bg-blue-400 duration-300" onClick={() => { setFilterWait(true); onClickConfirm(); }}>
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

export default FinancialOperationsFilter;