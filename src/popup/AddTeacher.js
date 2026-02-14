import { Box, Button, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import Fetch from "../services/Fetch";
import AddIcon from '@mui/icons-material/Add';
import { useAddTeacher } from "../hooks/UseAddTeacher";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { buildAddTeacherFormData } from "../helper/AddTeacherFormData";
import { useWaits } from "../hooks/UseWait";
import { useState } from "react";

function AddTeacher({ onClickClose, setSnackBar, setTeachers }) {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const language = localStorage.getItem('language');
    const { sendWait, setSendWait } = useWaits();
    const theme = useTheme();
    const { firstName, setFirstName, lastName, setLastName, specialization, setSpecialization, academicDegree,
        setAcademicDegree, experienceYears, setExperienceYears, birthdate, setBirthDate, email, setEmail, phoneNumber,
        setPhoneNumber, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, major, setMajor } = useAddTeacher();
    const [academicDegreeValue, setAcademicDegreeValue] = useState('');
    const [teacherSpecializationsValue, setTeacherSpecializationsValue] = useState('');
    const [majorValue, setMajorValue] = useState('');

    const handleChange = (value, country, e, formattedValue) => {
        console.log("Full value:", value);
        console.log("Formatted:", formattedValue);
        console.log("Country object:", country);
        console.log("Dial code:", country.dialCode);

        const numberWithoutCode = value.replace(country.dialCode, "");
        console.log("Number without code:", numberWithoutCode);
        setCode(country.dialCode);
        setPhoneNumber(numberWithoutCode);
    };

    const loadAcademicDegrees = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/academic-degrees`);
        return {
            options: response.data.data.data.map((item) => ({
                value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
            })),

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
            options: [...optionsFromApi],

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    const loadMajors = async (search, loadedOptions, { page }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/majors`);
        const optionsFromApi = response.data.data.map((item) => ({ value: item.id, label: language === 'en' ? item.name_en : item.name_ar, }));
        return {
            options: optionsFromApi,

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    const resetInputs = () => {
        setFirstName('');
        setLastName('');
        setSpecialization('');
        setAcademicDegree('');
        setExperienceYears('');
        setBirthDate('2025-01-01');
        setEmail('');
        setPhoneNumber('');
        setCode('');
        setPassword('');
        setConfirmPassword('');
        setMajor('');
        setAcademicDegreeValue('');
        setTeacherSpecializationsValue('');
        setMajorValue('');
    }

    const addTeacher = async () => {
        setSendWait(true);
        console.log('email: ' + email);
        console.log('firstName: ' + firstName);
        console.log('lastName: ' + lastName);

        const formData = buildAddTeacherFormData({
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthDate: birthdate,
            code: code,
            phoneNumber: phoneNumber,
            specialization: specialization,
            academicDegree: academicDegree,
            experienceYears: experienceYears,
            major: major,
            password: password,
            confirmPassword: confirmPassword
        });


        let result = await Fetch(host + `/admin/users/store`, 'POST', formData);

        if (result.status === 200) {
            setTeachers((prevTeachers) => [result.data.data.user, ...prevTeachers]);
            resetInputs();
            setSnackBar('success', 'تمت الإضافة بنجاح');
            onClickClose();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">إضافة مدرس جديد</Typography>
            <CloseIcon onClick={() => {resetInputs(); onClickClose();}} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Box className=""></Box>
            <Box className="grid grid-cols-2 w-full gap-x-2 gap-y-5 mt-5 max-sm:grid-cols-1 max-sm:gap-x-0">
                <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} variant="outlined" className="w-full" label="الاسم الأول" />
                <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} variant="outlined" className="w-full" label="الاسم الأخير" />
                <Box className="col-span-2 max-sm:col-span-1">
                    <Typography variant="body1">الاختصاص</Typography>
                    <AsyncPaginate
                        value={teacherSpecializationsValue}
                        loadOptions={loadTeacherSpecializations}
                        onChange={(option) => { setTeacherSpecializationsValue(option); setSpecialization(option.value) }}
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
                </Box>
                <Box className="">
                    <Typography variant="body1">التخصص التعليمي</Typography>
                    <AsyncPaginate
                        value={majorValue}
                        loadOptions={loadMajors}
                        onChange={(option) => { setMajorValue(option); setMajor(option.value) }}
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
                </Box>
                <TextField type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} variant="outlined" className="w-full" label="سنوات الخبرة" />
                <TextField value={birthdate} onChange={(e) => setBirthDate(e.target.value)} variant="outlined" type="date" defaultValue="2025-01-01" className="w-full" label="تاريخ الميلاد" />
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" className="w-full" label="البريد الإلكتروني" />
                <Box dir="ltr" className="w-full h-full max-sm:h-12">
                    <PhoneInput country={'us'} containerStyle={{ width: "100%" }} buttonStyle={{ background: theme.palette.mode === 'dark' ? 'none' : '' }} inputStyle={{ width: '100%', height: "100%", color: theme.palette.mode === 'dark' ? 'white' : 'black', background: 'none' }} onChange={handleChange} />
                </Box>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" type="password" className="w-full" label="كلمة المرور" />
                <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="outlined" type="password" className="w-full" label="تأكيد كلمة المرور" />
            </Box>
            <Box className="flex justify-between mt-5 w-full max-sm:flex-col max-sm:items-center">
                <Button variant="contained" className="w-5/12 !text-white !font-bold hover:!bg-blue-400 duration-300 max-sm:w-full" onClick={addTeacher}>
                    {
                        sendWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            <>
                                <AddIcon />
                                إضافة
                            </>
                    }
                </Button>
                <Button onClick={() => {resetInputs(); onClickClose();}} variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold hover:!bg-gray-200 duration-300 max-sm:w-full max-sm:!mt-2">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default AddTeacher;