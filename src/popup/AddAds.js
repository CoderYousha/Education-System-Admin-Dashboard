import { Box, Button, CircularProgress, Divider, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from "react-select-async-paginate";
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import UploadImage from '../images/icons/upload-image.png';
import { useAddAds } from "../hooks/UseAddAds";
import { useWaits } from "../hooks/UseWait";
import Fetch from "../services/Fetch";
import { useConstants } from "../hooks/UseConstants";
import { buildAddAdsFormData } from "../helper/AddAdsFormData";
import { useEffect, useState } from "react";

function AddAds({ onClickClose, setSnackbar, getBanners }) {
    const { language, host } = useConstants();
    const theme = useTheme();
    const { sendWait, setSendWait } = useWaits();
    const { nameEn, setNameEn, nameAr, setNameAr, category, setCategory, categoryId, setCategoryId, image, setImage, isActive, setIsActive, activeFrom, setActiveFrom, activeUntil, setActiveUntil, descriptionEn, setDescriptionEn, descriptionAr, setDescriptionAr } = useAddAds();
    const [categoryValue, setCategoryValue] = useState();
    
    const resetInputs = () => {
        setNameAr('');
        setNameEn('');
        setCategory('courses');
        setCategoryId('');
        setCategoryValue('');
        setIsActive('1');
        setActiveFrom('');
        setActiveUntil('');
        setDescriptionAr('');
        setDescriptionEn('');
        setImage('');
    }

    const loadCategories = async ({ page, category }) => {
        const host = `${process.env.REACT_APP_LOCAL_HOST}`;
        const response = await Fetch(host + `/${category === 'courses' ? 'courses?status[]=accepted' : 'paths'}`);
        const optionsFromApi = response.data.data.map((item) => ({
            value: item.id, label: language === 'en' ? item.name_en : item.name_ar,
        }));
        return {
            options: optionsFromApi,

            hasMore: response.data.data.page * response.data.data.perPage < response.data.data.total, additional: { page: page + 1, category },
        };
    }

    useEffect(() => {
        setCategoryValue('');
        setCategoryValue(loadCategories(1).options);
    }, [category]);

    const addAds = async () => {
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

        let result = await Fetch(host + '/admin/banners/store', 'POST', formData);

        if (result.status === 200) {
            setSnackbar('success', 'تم إضافة الإعلان بنجاح');
            await getBanners();
            resetInputs();
            onClickClose();
        } else if (result.status === 422) {
            setSnackbar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:h-screen" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">إضافة إعلان جديد</Typography>
            <CloseIcon onClick={() => { resetInputs(); onClickClose(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <TextField variant="outlined" label="عنوان الإعلان بالعربية" className="w-full" onChange={(e) => setNameAr(e.target.value)} value={nameAr} />
            <TextField variant="outlined" label="عنوان الإعلان بالإنجليزية" className="w-full !mt-5" onChange={(e) => setNameEn(e.target.value)} value={nameEn} />
            <Box className="grid grid-cols-2 gap-x-2 gap-y-7 my-7 max-sm:grid-cols-1">
                <Box className="">
                    <Typography variant="body1" className="!font-semibold text-gray-400">نوع الإعلان</Typography>
                    <select className="w-full h-10 rounded-xl text-gray-500 bg-gray-200 mt-2 outline-none border border-gray-300" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="courses">الدورات</option>
                        <option value="paths">المسارات</option>
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
                <Select value={isActive} variant="standard" onChange={(e) => setIsActive(e.target.value)} className="w-full !rounded-xl !border-none" sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }}>
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
                <Button onClick={addAds} variant="contained" className="w-5/12 !text-white !font-bold max-sm:w-full">
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
                <Button onClick={() => { onClickClose(); }} variant="contained" className="w-5/12 !bg-gray-400 !text-gray-700 !font-bold max-sm:w-full max-sm:!mt-2">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default AddAds;