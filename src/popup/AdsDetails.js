import { Box, Button, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useConstants } from "../hooks/UseConstants";
import Fetch from "../services/Fetch";
import { useWaits } from "../hooks/UseWait";
import { FormattedMessage, useIntl } from "react-intl";

function AdsDetails({ onClickClose, onClickUpdate, banner, setSnackBar, setBanners }) {
    const { language, host } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const intl = useIntl();

    const deleteBanner = async () => {
        setSendWait(true);
        let result = await Fetch(host + `/admin/banners/${banner.id}/delete`, 'DELETE', null);

        if (result.status === 200) {
            setBanners((banners) => banners.filter((ads) => ads.id !== banner.id));
            setSnackBar('success', 'deleted successfully');
            onClickClose();
        }

        setSendWait(false);
    }
    const theme = useTheme();

    return (
        <>
            {
                banner &&
                <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:h-screen" dir="rtl">
                    <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id='ads_details' /></Typography>
                    <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
                    <Divider className="!my-5" />
                    <Box className="w-32 h-32 rounded-full mx-auto my-5">
                        <img src={banner.image} className="w-full h-full rounded-full" />
                    </Box>
                    <TextField variant="outlined" label={<FormattedMessage id='ads_title' />} className="w-full" value={language === 'en' ? banner.name_en : banner?.name_ar} />
                    <Box className="grid grid-cols-2 gap-x-2 gap-y-7 my-7 max-sm:grid-cols-1">
                        <TextField variant="outlined" label={<FormattedMessage id='ads_type' />} className="w-full" value={banner.category === 'course' ? intl.formatMessage({id: "course"}) : intl.formatMessage({id: "path"})} />
                        <TextField variant="outlined" label={intl.formatMessage({id: "category"}) + '/' + intl.formatMessage({id: "course"}) } className="w-full" value={language === 'en' ? banner.related_data.name_en : banner.related_data?.name_ar} />
                        <TextField variant="outlined" label={<FormattedMessage id='start_date' />} className="w-full" value={banner.active_from} />
                        <TextField variant="outlined" label={<FormattedMessage id='end_date' />} className="w-full" value={banner.active_until} />
                    </Box>
                    <TextField variant="outlined" label={<FormattedMessage id='ads_content' />} className="w-full" value={language === 'en' ? banner.description_en : banner.description_ar} />
                    <Box className="flex justify-between my-7 max-sm:flex-col max-sm:items-center">
                        <Button variant="contained" className="w-2/5 !font-bold !bg-green-300 !text-green-700 hover:!bg-green-400 hover:!text-white duration-300 max-sm:w-full" onClick={() => {onClickUpdate(banner.id); onClickClose();}}><FormattedMessage id='update' /></Button>
                        <Button variant="contained" className="w-2/5 !font-bold !bg-red-300 !text-red-700 hover:!bg-red-500 hover:!text-white duration-300 max-sm:w-full max-sm:!mt-2" onClick={deleteBanner}>
                            {
                                sendWait ?
                                    <CircularProgress size={20} className="" color="white" />
                                    :
                                    <Box>
                                        <FormattedMessage id='delete' />
                                    </Box>
                            }
                        </Button>
                    </Box>
                </Box>
            }
        </>
    );
}

export default AdsDetails;