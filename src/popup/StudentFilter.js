import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Fetch from "../services/Fetch";

function StudentFilter({ onClickClose, onClickConfirm, value, setValue, setMajorId, fromCount, setFromCount, toCount, setToCount, fromDate, setFromDate, toDate, setToDate, filterWait, setFilterWait }) {
    const language = localStorage.getItem('language');
    const theme = useTheme();

    const resetFilter = () => {
        setValue({ value: '', label: 'الكل' });
        setMajorId('');
        setFromDate('');
        setToDate('');
        setFromCount('');
        setToCount('');
    }

    const loadMajors = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/majors?page=${page}`);
        const optionsFromApi = response.data.data.map((item) => ({ value: item.id, label: language === 'en' ? item.name_en : item.name_ar, }));
        return {
            options: [{ value: '', label: 'الكل' }, ...optionsFromApi],

            hasMore: response.data.pagination.current_page * response.data.pagination.per_page < response.data.pagination.total, additional: { page: page + 1, },
        };
    }



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
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            color: 'black'
                        }),
                    }}
                    isSearchable={false}
                    value={value}
                    loadOptions={loadMajors}
                    onChange={(option) => { setValue(option); setMajorId(option.value) }}
                    additional={{
                        page: 1
                    }}
                />
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">عدد الدورات المسجلة</Typography>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من</Typography>
                    <input value={fromCount} onChange={(e) => setFromCount(e.target.value)} type="number" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" defaultValue={fromCount ? fromCount : "1"} />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى</Typography>
                    <input value={toCount} onChange={(e) => setToCount(e.target.value)} type="number" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" defaultValue={toCount ? toCount : "5"} />
                </Box>
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">تاريخ التسجيل</Typography>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من تاريخ</Typography>
                    <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" defaultValue={fromDate ? fromDate : "2025-07-12"} />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى تاريخ</Typography>
                    <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" defaultValue={toDate ? toDate : "2025-07-12"} />
                </Box>
            </Box>
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 hover:!bg-gray-200 duration-300 !font-semibold max-sm:w-full" onClick={resetFilter}>إعادة التعيين</Button>
                <Button variant="contained" className="w-5/12 h-10 !text-white hover:bg-blue-400 duration-300 max-sm:w-full max-sm:!mt-5" onClick={() => { setFilterWait(true); onClickConfirm(); }}>
                    <Box>
                        {
                            filterWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <Box>
                                    تطبيق الفلترة
                                    <FilterAltOutlinedIcon />
                                </Box>
                        }
                    </Box>
                </Button>
            </Box>
        </Box>
    );
}

export default StudentFilter;