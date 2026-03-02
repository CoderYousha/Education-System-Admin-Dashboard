import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from "react-intl";

function StudentDetails({ onClickClose, student }) {
    const language = localStorage.getItem('language');
    const today = new Date();
    const birth_date = new Date(student.birth_date);

    let age = today.getFullYear() - birth_date.getFullYear();

    const theme = useTheme();
    const intl = useIntl();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id="student_details" /></Typography>
            <CloseIcon onClick={onClickClose} className="text-gray-700 cursor-pointer absolute top-5 left-5" sx={{left: language === 'en' && '90%'}} fontSize="large" />
            <Divider className="!my-5" />
            <Box className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-5 flex justify-center items-center text-gray-500 text-2xl font-bold">{student.first_name?.charAt(0) + '' + student.last_name?.charAt(0)}</Box>
            <TextField variant="outlined" label={<FormattedMessage id="student_name" />} className="w-full" value={student.first_name + ' ' + student.last_name} />
            <Box className="grid grid-cols-2 w-full gap-x-2 gap-y-5 mt-5 max-sm:grid-cols-1">
                <TextField variant="outlined" className="w-full" label={<FormattedMessage id="education_specialization" />} value={student.major?.level === 'school' ? intl.formatMessage({id: "school_education"}) : intl.formatMessage({id: "university_education"})} />
                <TextField variant="outlined" className="w-full" label={student.major?.level === 'school' ? <FormattedMessage id="education_stage" /> : <FormattedMessage id="collage" />} />
                {
                    student.major?.level === 'school' &&
                    <TextField variant="outlined" className="w-full" label={<FormattedMessage id="class" />} value={language === 'en' ? student.major?.name_en : student.major?.name_ar}/>
                }
                <TextField variant="outlined" className="w-full" label={<FormattedMessage id="age" />} value={age} />
                <TextField variant="outlined" className="w-full" label={<FormattedMessage id="email" />} value={student.email} />
                <TextField variant="outlined" className="w-full" label={<FormattedMessage id="phone" />} value={student.phone_code + ' ' + student.phone} dir="ltr" />
            </Box>
        </Box>
    );
}

export default StudentDetails;