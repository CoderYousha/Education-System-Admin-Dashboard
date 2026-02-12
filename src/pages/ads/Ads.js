import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useSnackBar from "../../hooks/UseSnackBar";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import Fetch from "../../services/Fetch";
import SnackbarAlert from "../../components/SnackBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useConstants } from "../../hooks/UseConstants";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePopups } from "../../hooks/UsePopups";
import AdsDetails from "../../popup/AdsDetails";
import AddAds from "../../popup/AddAds";
import UpdateAds from "../../popup/UpdateAds";
import DeleteDialog from "../../popup/DeleteDialog";
import CircleIcon from '@mui/icons-material/Circle';
import AdsFilter from "../../popup/AdsFilter";
import { useAdsFilter } from "../../filter/UseAdsFilter";

function Ads() {
    const { host, language } = useConstants();
    const { wait } = useContext(AuthContext);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { getWait, setGetWait, filterWait, setFilterWait } = useWaits();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { activeFrom, setActiveFrom, activeUntil, setActiveUntil, category, setCategory, status, setStatus } = useAdsFilter();
    const { setPopup } = usePopups();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [bannersCounts, setBannersCounts] = useState('');
    const [banners, setBanners] = useState([]);
    const [banner, setBanner] = useState('');
    const [bannerId, setBannerId] = useState('');
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');
    const theme = useTheme();

    const getBanners = async () => {
        let result = await Fetch(host + `/banners?status=${status}&page=${page + 1}&search=${search}&direction=asc&${order && `order_by=${order}`}${category && `&category=${category}`}${activeFrom && `&active_from=${activeFrom}`}${activeUntil && `&active_until=${activeUntil}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setBannersCounts(result.data.data.total);
            setBanners(result.data.data.data);

            setCurrentPage(page);
        }

        setGetWait(false);
    }

    const filteringBanners = async () => {
        let result = await Fetch(host + `/banners?status=${status}&page=${page + 1}&search=${search}&direction=asc&${order && `order_by=${order}`}${category && `&category=${category}`}${activeFrom && `&active_from=${activeFrom}`}${activeUntil && `&active_until=${activeUntil}`}`, 'GET', null);

        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setBannersCounts(result.data.data.total);
            setBanners(result.data.data.data);
            setCurrentPage(page);
            setPopup('filter', 'none');
        }

        setFilterWait(false);
    }

    const updateBanner = (id) => {
        setBanner(banners.filter((banner) => banner.id === id)[0]);

        setPopup('update', 'flex');
    }

    const bannerDetails = (id) => {
        setBanner(banners.filter((banner) => banner.id === id)[0]);

        setPopup('details', 'flex');
    }

    const deleteBanner = async () => {
        let result = await Fetch(host + `/admin/banners/${bannerId}/delete`, 'DELETE', null);

        if (result.status === 200) {
            setBanners((banners) => banners.filter((banner) => banner.id !== bannerId));
            setSnackBar('success', 'deleted successfully');
        }
    }

    useEffect(() => {
        getBanners();
    }, [page, search, order]);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir="rtl">
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl">
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">الإعلانات</Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="">
                                                <AddIcon />
                                                إضافة إعلان جديد
                                            </Button>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir="rtl">
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder="البحث بالعنوان أو الفئة/الدورة" />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <select onChange={(e) => setOrder(e.target.value)} style={{ backgroundColor: theme.palette.background.select }} className="w-2/5 py-1 rounded-lg ml-3 outline-none">
                                                            <option value=''>التاريخ</option>
                                                            <option value='first_name'>عنوان الإعلان</option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500">إجمالي الإعلانات: {bannersCounts}</Typography>
                                                    </Box>
                                                </Box>
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align="right">عنوان الإعلان</StyledTableCell>
                                                            <StyledTableCell align="right">نوع الإعلان</StyledTableCell>
                                                            <StyledTableCell align="right">الفئة/الدورة</StyledTableCell>
                                                            <StyledTableCell align="right" className="">تاريخ البدء</StyledTableCell>
                                                            <StyledTableCell align="right">تاريخ الانتهاء</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">الحالة</StyledTableCell>
                                                            <StyledTableCell align="right" className="!text-center">الإجراءات</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {banners.map((banner, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => bannerDetails(banner.id)}>
                                                                <StyledTableCell align="right" component="th" scope="row">{language === 'en' ? banner.name_en : banner.name_ar}</StyledTableCell>
                                                                <StyledTableCell align="right" className="">{banner.category === 'course' ? 'دورة' : 'مسار'}</StyledTableCell>
                                                                <StyledTableCell align="right">{language === 'en' ? banner.related_data?.name_en : banner.related_data?.name_ar}</StyledTableCell>
                                                                <StyledTableCell align="right" className="text-center">{banner.active_from}</StyledTableCell>
                                                                <StyledTableCell align="right" className="">{banner.active_until}</StyledTableCell>
                                                                <StyledTableCell align="right" className="!text-center" dir="ltr">
                                                                    <Select disabled={true} value={banner.is_active && new Date() < new Date(banner.active_from) ? "not_started" : banner.is_active && new Date() <= new Date(banner.active_until) ? "1" : !banner.is_active ? "0" : "ended"} variant="standard" defaultValue="active" onClick={(e) => e.stopPropagation()} className="!border-0" sx={{ border: 'none' }}>
                                                                        <MenuItem value="1">
                                                                            <CircleIcon className="text-green-700" fontSize="small" /> نشط
                                                                        </MenuItem>
                                                                        <MenuItem value="0">
                                                                            <CircleIcon className="text-gray-700" fontSize="small" /> متوقف
                                                                        </MenuItem>
                                                                        <MenuItem value="ended">
                                                                            <CircleIcon className="text-red-700" fontSize="small" /> منهي
                                                                        </MenuItem>
                                                                        <MenuItem value="not_started">
                                                                            <CircleIcon className="text-orange-500" fontSize="small" /> لم يبدأ بعد
                                                                        </MenuItem>
                                                                    </Select>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right" className="!flex justify-around items-center">
                                                                    <Button variant="contained" className="!bg-red-300 !font-bold !text-red-700" onClick={(e) => {e.stopPropagation(); setBannerId(banner.id); setPopup('delete', 'flex');}}>حذف</Button>
                                                                    <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800" onClick={(e) => {e.stopPropagation(); updateBanner(banner.id);}}>تعديل</Button>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                <Box className="flex justify-center items-center" dir="rtl">
                                                    <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                        <NavigateNextIcon fontSize="large" />
                                                    </Button>
                                                    <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                                    <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                        <NavigateBeforeIcon fontSize="large" />
                                                    </Button>
                                                </Box>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>
                        <Box id="filter" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AdsFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringBanners} status={status} setStatus={setStatus} category={category} setCategory={setCategory} activeFrom={activeFrom} setActiveFrom={setActiveFrom} activeUntil={activeUntil} setActiveUntil={setActiveUntil} filterWait={filterWait} setFilterWait={setFilterWait} />
                        </Box>
                        <Box id="add" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AddAds onClickClose={() => setPopup('add', 'none')} setSnackbar={setSnackBar} getBanners={getBanners} />
                        </Box>
                        <Box id="update" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <UpdateAds setSnackbar={setSnackBar} setBanner={setBanner} banner={banner} onClickClose={() => setPopup('update', 'none')} getBanners={getBanners}/>
                        </Box>
                        <Box id="delete" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <DeleteDialog onClickConfirm={deleteBanner} onClickCancel={() => setPopup('delete', 'none')} title="تأكيد حذف الإعلان" subtitle="سيتم حذف هذا الإعلان نهائيا ولن يظهر للطلاب مرة أخرى، لا يمكن التراجع عن هذا الإجراء" />
                        </Box>
                        <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AdsDetails onClickClose={() => setPopup('details', 'none')} setSnackBar={setSnackBar} setBanners={setBanners} banner={banner} onClickUpdate={updateBanner}/>
                        </Box>
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Ads;