import { Box, Button, CircularProgress, Divider, Typography, useTheme } from "@mui/material";
import { useConstants } from "../hooks/UseConstants";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FormattedMessage } from "react-intl";

function AdsFilter({ onClickClose, onClickConfirm, filterWait, setFilterWait, status, setStatus, category, setCategory, activeFrom, setActiveFrom, activeUntil, setActiveUntil }) {
    const { language } = useConstants();
    const theme = useTheme();

    const resetFilter = () => {
        setStatus('');
        setCategory('');
        setActiveFrom('');
        setActiveUntil('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id='filtering_ads' /></Typography>
            <CloseIcon onClick={() => { onClickClose(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <Typography variant="body1"><FormattedMessage id='ads_state' /></Typography>
            <select className="w-full my-5 rounded-lg text-black bg-gray-200 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value=""><FormattedMessage id='all' /></option>
                <option value="active"><FormattedMessage id='active' /></option>
                <option value="not_active"><FormattedMessage id='stopped' /></option>
                <option value="ended"><FormattedMessage id='finished' /></option>
                <option value="not_started"><FormattedMessage id='not_started' /></option>
            </select>
            <Typography variant="body1"><FormattedMessage id='ads_type' /></Typography>
            <select className="w-full my-5 rounded-lg text-black bg-gray-200 py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value=""><FormattedMessage id='all' /></option>
                <option value="course"><FormattedMessage id='course' /></option>
                <option value="path"><FormattedMessage id='path' /></option>
            </select>
            <Box className="flex justify-between mt-5 max-sm:flex-col">
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400"><FormattedMessage id='start_date' /></Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={activeFrom} onChange={(e) => setActiveFrom(e.target.value)} />
                </Box>
                <Box className="w-2/5 max-sm:w-full">
                    <Typography variant="body2" className="!font-semibold text-gray-400"><FormattedMessage id='end_date' /></Typography>
                    <input type="date" className="text-black mt-2 w-full rounded-lg h-10 bg-gray-200 px-2" value={activeUntil} onChange={(e) => setActiveUntil(e.target.value)} />
                </Box>
            </Box>
            <Box className="w-full flex justify-between mt-10 max-sm:flex-col">
                <Button onClick={resetFilter} variant="contained" className="w-5/12 h-10 !bg-gray-300 !text-gray-500 !font-semibold hover:!bg-gray-200 duration-300 max-sm:w-full"><FormattedMessage id='reset' /></Button>
                <Button variant="contained" className="w-5/12 h-10 !text-white hover:bg-blue-400 duration-300 max-sm:w-full max-sm:!mt-5" onClick={async () => { setFilterWait(true); onClickConfirm(); }}>
                    {
                        filterWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            <Box>
                                <FormattedMessage id='filtering' />
                                <FilterAltOutlinedIcon />
                            </Box>
                    }
                </Button>
            </Box>
        </Box>
    );
}

export default AdsFilter;