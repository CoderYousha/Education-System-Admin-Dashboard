import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AsyncPaginate } from "react-select-async-paginate";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useEffect, useState } from "react";
import Fetch from "../services/Fetch";

function RequestFilter({ onClickClose, onClickConfirm, onClickReset, onClickStatus, status, from, setFrom, to, setTo, teacherId, value, setValue, setTeacherId, courseName, setCourseName, filterWait, setFilterWait }) {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const theme = useTheme();

    useEffect(() => {
        const selected = async () => {
            if (teacherId) {
                let result = await Fetch(host + `/admin/users/${teacherId}/show`, 'GET');

                if (result.status == 200) {
                    setValue({ value: result.data.id, label: result.data.first_name + result.data.last_name });
                }
            }
        }

        selected();
    }, []);

    const loadOptions = async (search, loadedOptions, { page }) => {
        const response = await Fetch(host + `/admin/users?account_role=teacher`);
        // const json = await response.json();
        return {
            options: response.data.data.data.map((item) => ({
                value: item.id, label: item.first_name + item.last_name,
            })),

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, },
        };
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تصفية الطلبات</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Typography variant="body1" className="!font-semibold text-gray-400">حالة الطلب</Typography>
            <Box className="">
                <Box className="flex justify-between items-center border-2 rounded-lg py-1 px-2 mt-4 cursor-pointer" onClick={() => onClickStatus("pending")}>
                    <Box className="flex items-center">
                        <CircleIcon className="text-orange-400" fontSize="small" />
                        <Typography variant="body1" className="!font-semibold pr-2">بانتظار الموافقة</Typography>
                    </Box>
                    {
                        status.includes("pending") &&
                        <Box className="w-8 h-8 flex justify-center items-center border-2 rounded-lg">
                            <CheckIcon fontSize="medium" />
                        </Box>
                    }
                </Box>
                <Box className="flex justify-between items-center border-2 rounded-lg py-1 px-2 mt-4 cursor-pointer" onClick={() => onClickStatus("accepted")}>
                    <Box className="flex items-center">
                        <CircleIcon className="text-green-400" fontSize="small" />
                        <Typography variant="body1" className="!font-semibold pr-2">مقبول</Typography>
                    </Box>
                    {
                        status.includes("accepted") &&
                        <Box className="w-8 h-8 flex justify-center items-center border-2 rounded-lg">
                            <CheckIcon fontSize="medium" />
                        </Box>
                    }
                </Box>
                <Box className="flex justify-between items-center border-2 rounded-lg py-1 px-2 mt-4 cursor-pointer" onClick={() => onClickStatus("rejected")}>
                    <Box className="flex items-center">
                        <CircleIcon className="text-red-600" fontSize="small" />
                        <Typography variant="body1" className="!font-semibold pr-2">مرفوض</Typography>
                    </Box>
                    {
                        status.includes("rejected") &&
                        <Box className="w-8 h-8 flex justify-center items-center border-2 rounded-lg">
                            <CheckIcon fontSize="medium" />
                        </Box>
                    }
                </Box>
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">تاريخ الطلب</Typography>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">من</Typography>
                    <input onChange={(e) => setFrom(e.target.value)} type="date" className="mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={from ? from : "2025-07-12"} />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400">إلى</Typography>
                    <input onChange={(e) => setTo(e.target.value)} type="date" className="mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={to ? to : "2025-07-12"} />
                </Box>
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">اسم المدرس</Typography>
            <Box className="">
                <AsyncPaginate
                    value={value}
                    loadOptions={loadOptions}
                    onChange={(option) => { setValue(option); setTeacherId(option.value) }}
                    additional={{
                        page: 1
                    }}
                    className="mt-2 !bg-gray-200"
                    placeholder={<Box className="flex items-center"><PersonOutlineOutlinedIcon /><Typography variant="body2" className="">اسم الأستاذ</Typography> </Box>}
                />
            </Box>
            <Typography variant="body1" className="!font-semibold text-gray-400 !mt-5">اسم الدورة</Typography>
            <Box className="">
                <input value={courseName} onChange={(e) => setCourseName(e.target.value)} className="mt-2 w-full h-10 rounded-lg border bg-gray-200 indent-3 outline-none" placeholder="أدخل اسم الدورة" />
            </Box>
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button onClick={onClickReset} variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold max-sm:w-full">إعادة التعيين</Button>
                <Button variant="contained" className="w-5/12 h-10 max-sm:w-full max-sm:!mt-5" onClick={() => { setFilterWait(true); onClickConfirm();}}>
                    {
                        filterWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            <Box sx={{ color: theme.palette.mode == 'dark' ?  'white' : 'black'}}>
                                تطبيق الفلترة
                                <FilterAltOutlinedIcon />
                            </Box>
                    }
                </Button>
            </Box>
        </Box>
    );
}
export default RequestFilter;