import { Box, Button, CircularProgress, TextField, Typography, useTheme } from "@mui/material";
import { useConstants } from "../hooks/UseConstants";
import DeleteImage from '../images/icons/delete.png';
import { useWaits } from "../hooks/UseWait";
import GratWarningImage from "../images/icons/gray-warning.png";

function DeleteDialog({ onClickConfirm, onClickCancel, title, subtitle, hasInput, label, placeholder, warning }) {
    const { language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-2/5 rounded-3xl py-2 px-5 max-sm:w-3/4">
            <Box className="w-20 h-20 bg-red-300 rounded-full flex justify-center items-center mx-auto my-5">
                <img src={DeleteImage} className="" />
            </Box>
            <Typography className="text-center !font-semibold" variant="h6">{title}</Typography>
            <Typography className="text-center !my-3" variant="body2" dir="rtl">{subtitle}</Typography>
            {
                hasInput &&
                <TextField dir="rtl" multiline rows={4} placeholder={placeholder} className="w-full" variant="outlined" label={label} />
            }
            <Box className="flex my-2 flex-row-reverse">
                <img src={GratWarningImage} />
                <Typography variant="body2" className="!mr-1 text-gray-600">{warning}</Typography>
            </Box>
            <Box className="flex justify-between mt-5">
                <Button onClick={async () => { setSendWait(true); await onClickConfirm(); setSendWait(false); onClickCancel(); }} variant="contained" className="w-2/5 !bg-red-300 !text-red-700 !font-bold">
                    {
                        sendWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            "حذف"
                    }
                </Button>
                <Button variant="contained" className="w-2/5 !bg-gray-300 !text-gray-700 !font-bold" onClick={onClickCancel}>إلغاء</Button>
            </Box>
        </Box>
    );
}

export default DeleteDialog;