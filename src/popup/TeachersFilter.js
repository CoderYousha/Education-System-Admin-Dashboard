import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Fetch from "../services/Fetch";
import { AsyncPaginate } from "react-select-async-paginate";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function TeachersFilter({ onClickClose, onClickConfirm, majorsValue, academicDegreeValue, setAcademicDegreeValue, setMajorsValue, setMajorId, setAcademicDegree, setTeacherSpecializations, teacherSpecializationsValue, setTeacherSpecializationsValue, filterWait, setFilterWait }) {
    const language = localStorage.getItem('language');
    const theme = useTheme();

    const resetFilter = async () => {
        setAcademicDegreeValue({ value: '', label: 'الكل' });
        setTeacherSpecializationsValue({ value: '', label: 'الكل' });
        setMajorsValue({ value: '', label: 'الكل' });
        setMajorId('');
        setTeacherSpecializations('');
        setAcademicDegree('');
    }

    const loadMajors = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/majors?page=${page}`);
        const optionsFromApi = response.data.data.map((item) => ({
            value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
        }));
        return {
            options: [{ value: '', label: 'الكل' }, ...optionsFromApi],

            hasMore: response.data.pagination.current_page * response.data.pagination.per_page < response.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const loadAcademicDegrees = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/academic-degrees`);

        const optionsFromApi = response.data.data.data.map((item) => ({
            value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
        }));
        return {
            options: [{ value: '', label: 'الكل' }, ...optionsFromApi],

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    const loadTeacherSpecializations = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/teacher-specializations`);

        const optionsFromApi = response.data.data.data.map((item) => ({
            value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
        }));
        return {
            options: [{ value: '', label: 'الكل' }, ...optionsFromApi],

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تصفية المدرسين</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Box className=""></Box>
            <Typography variant="body1">الاختصاص</Typography>
            <AsyncPaginate
                value={teacherSpecializationsValue}
                loadOptions={loadTeacherSpecializations}
                onChange={(option) => { setTeacherSpecializationsValue(option); setTeacherSpecializations(option.value) }}
                additional={{
                    page: 1
                }}
                className="mt-2 !bg-gray-200"
                placeholder="الاختصاص"
                styles={{
                    option: (provided, state) => ({
                        ...provided,
                        color: 'black'
                    }),
                }}
                isSearchable={false}
            />
            <Typography variant="body1" className="!mt-5">التخصص التعليمي</Typography>
            <AsyncPaginate
                value={majorsValue}
                loadOptions={loadMajors}
                onChange={(option) => { setMajorsValue(option); setMajorId(option.value) }}
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
            <Typography variant="body1" className="!mt-5">الدرجة العلمية</Typography>
            <AsyncPaginate
                value={academicDegreeValue}
                loadOptions={loadAcademicDegrees}
                onChange={(option) => { setAcademicDegreeValue(option); setAcademicDegree(option.value) }}
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
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold hover:!bg-gray-200 duration-300 max-sm:w-full" onClick={resetFilter}>إعادة التعيين</Button>
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

export default TeachersFilter;