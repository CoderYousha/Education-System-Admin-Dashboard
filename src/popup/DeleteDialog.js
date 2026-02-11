import { Box, Button, Typography, useTheme } from "@mui/material";
import { useConstants } from "../hooks/UseConstants";
import DeleteImage from '../images/icons/delete.png';

function DeleteDialog({ onClickCancel, title, subtitle }) {
    const { language } = useConstants();
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-2/5 rounded-3xl py-2 px-5 max-sm:w-3/4">
            <Box className="w-20 h-20 bg-red-300 rounded-full flex justify-center items-center mx-auto">
                <img src={DeleteImage} className="" />
            </Box>
            <Typography className="text-center !font-semibold" variant="h6">{title}</Typography>
            <Typography className="text-center !my-2" variant="body2">{subtitle}</Typography>
            <Box className="flex justify-between">
                <Button variant="contained" className="w-2/5 !bg-red-300 !text-red-700 !font-bold">حذف</Button>
                <Button variant="contained" className="w-2/5 !bg-gray-300 !text-gray-700 !font-bold">إلغاء</Button>
            </Box>
        </Box>
    );
}

export default DeleteDialog;