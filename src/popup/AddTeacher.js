import { Box, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AddTeacher({onClickClose}) {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">إضافة مدرس جديد</Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large"></CloseIcon>
            <Divider className="!my-5" />
            <Box className=""></Box>
        </Box>
    );
}

export default AddTeacher;