import { Box, Button, CircularProgress, Divider, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import CircleIcon from '@mui/icons-material/Circle';
import UploadImage from '../images/icons/upload-image.png';
import { useAddAds } from "../hooks/UseAddAds";
import { useWaits } from "../hooks/UseWait";
import Fetch from "../services/Fetch";
import { useConstants } from "../hooks/UseConstants";
import { buildAddAdsFormData } from "../helper/AddAdsFormData";
import { useEffect, useState } from "react";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function UpdateAds({ onClickClose, setSnackbar, banner, setBanner, getBanners }) {
    const { language, host } = useConstants();
    const theme = useTheme();
    const { sendWait, setSendWait } = useWaits();
    const { nameEn, setNameEn, nameAr, setNameAr, category, setCategory, categoryId, setCategoryId, image, setImage, isActive, setIsActive, activeFrom, setActiveFrom, activeUntil, setActiveUntil, descriptionEn, setDescriptionEn, descriptionAr, setDescriptionAr } = useAddAds();
    const [categoryValue, setCategoryValue] = useState();
    const [categoryDetails, setCategoryDetails] = useState();

    const loadCategories = async ({ page, category }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/${category === 'course' ? `courses?page=${page}&status[]=accepted` : `paths?page=${page}`}`);
        const optionsFromApi = response.data.data.map((item) => ({
            value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
        }));
        return {
            options: optionsFromApi,

            hasMore: response.data.pagination.current_page * response.data.pagination.per_page < response.data.pagination.total, additional: { page: page + 1, category },
        };
    }

    const setInputs = () => {
        setCategory(banner.category);
        setCategoryId(banner.category_id);
        setNameEn(banner.name_en);
        setNameAr(banner.name_ar);
        setDescriptionAr(banner.description_ar);
        setDescriptionEn(banner.description_en);
        setActiveFrom(banner.active_from);
        setActiveUntil(banner.active_until);
        setIsActive(banner.is_active? 1 : 0);
    }

    const getCategoryDetails = async () => {
        let result = await Fetch(host + `/${banner.category === 'course' ? 'courses' : 'paths'}/${banner.category_id}/show`);

        if (result.status === 200) {
            setCategoryDetails(result.data.data);
            setCategoryValue({ value: result.data.data.id, label: language === 'en' ? result.data.data.name_en : result.data.data.name_ar });
        }
    }

    const updateAds = async () => {
        setSendWait(true);

        const formData = buildAddAdsFormData({
            activeFrom: activeFrom,
            activeUntil: activeUntil,
            category: category,
            categoryId: categoryId,
            descriptionAr: descriptionAr,
            descriptionEn: descriptionEn,
            image: image,
            isActive: isActive,
            nameAr: nameAr,
            nameEn: nameEn
        });

        let result = await Fetch(host + `/admin/banners/${banner.id}/update`, 'POST', formData);

        if (result.status === 200) {
            setSnackbar('success', 'تم تعديل الإعلان بنجاح');
            await getBanners();
            setBanner('');
            onClickClose();
        } else if (result.status === 422) {
            setSnackbar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    useEffect(() => {
        setInputs();
        getCategoryDetails();
    }, [banner]);

    useEffect(() => {
        setCategoryValue('');
    }, [category]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:h-screen" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">تعديل الإعلان</Typography>
            <CloseIcon onClick={() => { setBanner(''); onClickClose(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <TextField variant="outlined" label="عنوان الإعلان بالعربية" className="w-full" onChange={(e) => setNameAr(e.target.value)} value={nameAr} />
            <TextField variant="outlined" label="عنوان الإعلان بالإنجليزية" className="w-full !mt-5" onChange={(e) => setNameEn(e.target.value)} value={nameEn} />
            <Box className="grid grid-cols-2 gap-x-2 gap-y-7 my-7 max-sm:grid-cols-1">
                <Box className="">
                    <Typography variant="body1" className="!font-semibold text-gray-400">نوع الإعلان</Typography>
                    <select className="w-full h-10 rounded-xl text-gray-500 bg-gray-200 mt-2 outline-none border border-gray-300" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="course">الدورات</option>
                        <option value="path">المسارات</option>
                    </select>
                </Box>
                <Box className="">
                    <Typography variant="body1" className="!font-semibold text-gray-400">الفئة / الدورة</Typography>
                    <AsyncPaginate
                        key={category}
                        value={categoryValue}
                        loadOptions={(params) => loadCategories({ ...params, category })}
                        additional={{
                            page: 1,
                            category: category
                        }}
                        onChange={(option) => { setCategoryValue(option); setCategoryId(option.value) }}
                        className="mt-2 z-50"
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
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" onChange={(e) => setActiveFrom(e.target.value)} value={activeFrom} />
                </Box>
                <Box className="">
                    <Typography variant="body2" className="!font-semibold text-gray-400">تاريخ الإنتهاء</Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2 outline-none" onChange={(e) => setActiveUntil(e.target.value)} value={activeUntil} />
                </Box>
            </Box>
            <TextField variant="outlined" label="محتوى الإعلان بالعربية" className="w-full" onChange={(e) => setDescriptionAr(e.target.value)} value={descriptionAr} />
            <TextField variant="outlined" label="محتوى الإعلان بالإنجليزية" className="w-full !mt-5" onChange={(e) => setDescriptionEn(e.target.value)} value={descriptionEn} />
            <Box className="mt-7">
                <Typography variant="body2" className="!font-semibold text-gray-400">الحالة</Typography>
                <Select value={isActive ? "1" : "0"} variant="standard" onChange={(e) => setIsActive(e.target.value === "1" ? 1 : 0)} className="w-full !rounded-xl !border-none" sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }}>
                    <MenuItem dir="rtl" value="1">
                        <CircleIcon className="text-green-700" fontSize="small" /> نشط
                    </MenuItem>
                    <MenuItem dir="rtl" value="0">
                        <CircleIcon className="text-gray-700" fontSize="small" /> متوقف
                    </MenuItem>
                </Select>
            </Box>
            <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-5 flex flex-col items-center justify-center cursor-pointer">
                <img src={UploadImage} className="" />
                <Typography variant="body1" className="text-gray-700">إضافة صورة</Typography>
                <input type="file" accept="image/*" className="w-full h-full opacity-0 absolute cursor-pointer" onChange={(e) => setImage(e.target.files[0])} />
            </Box>
            <Box className="flex justify-between mt-5 w-full max-sm:flex-col max-sm:items-center">
                <Button onClick={updateAds} variant="contained" className="w-5/12 !text-white !font-bold hover:!bg-blue-400 duration-300 max-sm:w-full">
                    {
                        sendWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            <>
                                <SaveOutlinedIcon />
                                حفظ
                            </>
                    }
                </Button>
                <Button onClick={() => { onClickClose(); }} variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold hover:!bg-gray-200 duration-300 max-sm:w-full max-sm:!mt-2">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default UpdateAds;