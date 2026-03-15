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
import { FormattedMessage, useIntl } from "react-intl";
import { usePagination } from "../../hooks/UsePagination";
import { useSearch } from "../../hooks/UseSearch";

function Ads() {
    const theme = useTheme();
    const intl = useIntl();
    const { wait } = useContext(AuthContext);
    const { setPopup } = usePopups();
    const { host, language } = useConstants();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { search, setSearch, order, setOrder } = useSearch();
    const { getWait, setGetWait, filterWait, setFilterWait } = useWaits();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const { activeFrom, setActiveFrom, activeUntil, setActiveUntil, category, setCategory, status, setStatus } = useAdsFilter();
    const [bannersCounts, setBannersCounts] = useState('');
    const [banners, setBanners] = useState([]);
    const [banner, setBanner] = useState('');
    const [bannerId, setBannerId] = useState('');

    {/* Get Banners Function */ }
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

    {/* Filtering Banners Function */ }
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

    {/* Update Banner Information Function */ }
    const updateBanner = (id) => {
        setBanner(banners.filter((banner) => banner.id === id)[0]);

        setPopup('update', 'flex');
    }

    {/* Get Specefic Banner Details */ }
    const bannerDetails = (id) => {
        setBanner(banners.filter((banner) => banner.id === id)[0]);

        setPopup('details', 'flex');
    }

    {/* Delete Banner Function */ }
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
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='ads' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="">
                                                <AddIcon />
                                                <FormattedMessage id='add_ads' />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <TableContainer component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" />
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-10/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_ads" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <select onChange={(e) => setOrder(e.target.value)} style={{ backgroundColor: theme.palette.background.select }} className="w-2/5 py-1 rounded-lg mx-3 outline-none">
                                                            <option value=''><FormattedMessage id='date' /></option>
                                                            <option value={language === 'en' ? 'name_en' : 'name_ar'}><FormattedMessage id='ads_title' /></option>
                                                        </select>
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_ads' />: {bannersCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Banners Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='ads_title' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='ads_type' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='category' />/<FormattedMessage id='course' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><FormattedMessage id='start_date' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='end_date' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='ads_state' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {banners.map((banner, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-400 duration-100 cursor-pointer" onClick={() => bannerDetails(banner.id)}>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">{language === 'en' ? banner.name_en : banner.name_ar}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{banner.category === 'course' ? <FormattedMessage id='course' /> : <FormattedMessage id='path' />}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{language === 'en' ? banner.related_data?.name_en : banner.related_data?.name_ar}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="text-center">{banner.active_from}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="">{banner.active_until}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center" dir="ltr">
                                                                    <Select disabled={true} value={new Date() < new Date(banner.active_from) ? "not_started" : banner.is_active && new Date() <= new Date(banner.active_until) ? "1" : !banner.is_active ? "0" : "ended"} variant="standard" defaultValue="active" onClick={(e) => e.stopPropagation()} className="!border-0" sx={{ border: 'none' }}>
                                                                        <MenuItem value="1">
                                                                            <CircleIcon className="text-green-700" fontSize="small" /> <FormattedMessage id='active' />
                                                                        </MenuItem>
                                                                        <MenuItem value="0">
                                                                            <CircleIcon className="text-gray-700" fontSize="small" /> <FormattedMessage id='stopped' />
                                                                        </MenuItem>
                                                                        <MenuItem value="ended">
                                                                            <CircleIcon className="text-red-700" fontSize="small" /> <FormattedMessage id='finished' />
                                                                        </MenuItem>
                                                                        <MenuItem value="not_started">
                                                                            <CircleIcon className="text-orange-500" fontSize="small" /> <FormattedMessage id='not_started' />
                                                                        </MenuItem>
                                                                    </Select>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right" className="!flex justify-around items-center">
                                                                    <Button variant="contained" className="!bg-red-300 !font-bold !text-red-700 hover:!bg-red-500 hover:!text-white duration-300" onClick={(e) => { e.stopPropagation(); setBannerId(banner.id); setPopup('delete', 'flex'); }}><FormattedMessage id='delete' /></Button>
                                                                    <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300" onClick={(e) => { e.stopPropagation(); updateBanner(banner.id); }}><FormattedMessage id='update' /></Button>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>

                                                {/* Pagination Buttons */}
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

                        {/* Filtering Banners Popup */}
                        <Box id="filter" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AdsFilter onClickClose={() => setPopup('filter', 'none')} onClickConfirm={filteringBanners} status={status} setStatus={setStatus} category={category} setCategory={setCategory} activeFrom={activeFrom} setActiveFrom={setActiveFrom} activeUntil={activeUntil} setActiveUntil={setActiveUntil} filterWait={filterWait} setFilterWait={setFilterWait} />
                        </Box>

                        {/* Add New Banner Popup */}
                        <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AddAds onClickClose={() => setPopup('add', 'none')} setSnackbar={setSnackBar} getBanners={getBanners} />
                        </Box>

                        {/* Update Banner Popup */}
                        <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <UpdateAds setSnackbar={setSnackBar} setBanner={setBanner} banner={banner} onClickClose={() => setPopup('update', 'none')} getBanners={getBanners} />
                        </Box>

                        {/* Delete Banner Confirmation Popup */}
                        <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <DeleteDialog onClickConfirm={deleteBanner} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="ads_delete" />} subtitle={<FormattedMessage id="ads_delete_description" />} />
                        </Box>

                        {/* Banner Details Popup */}
                        <Box id="details" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <AdsDetails onClickClose={() => setPopup('details', 'none')} setSnackBar={setSnackBar} setBanners={setBanners} banner={banner} onClickUpdate={updateBanner} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Ads;