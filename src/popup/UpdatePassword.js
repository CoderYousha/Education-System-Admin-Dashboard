import { Box, Button, CircularProgress, TextField, Typography, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useWaits } from '../hooks/UseWait';
import { useConstants } from '../hooks/UseConstants';
import Fetch from '../services/Fetch';
import { useUpdatePassword } from '../hooks/UseUpdatePassword';
import { buildUpdatePasswordFormData } from '../helper/UpdatePasswordFormData';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

function UpdatePassword({ onClickCancel, setSnackBar }) {
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { password, setPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword } = useUpdatePassword();
    const theme = useTheme();

    const resetInputs = () => {
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    const updatePassword = async () => {
        setSendWait(true);

        const formData = buildUpdatePasswordFormData({
            oldPassword: password,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword
        });

        let result = await Fetch(host + '/account/update-password', 'POST', formData);

        if (result.status === 200) {
            resetInputs();
            setSnackBar('success', 'تم تعديل كلمة المرور بنجاح')
            onClickCancel();
        } else if (result.status === 422 || result.status === 400) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    return (
        <Box sx={{ background: theme.palette.background.paper }} className="w-1/2 h-3/4 rounded-xl py-3 px-5 overflow-y-scroll none-view-scroll max-sm:w-5/6">
            <Box className="w-20 h-20 rounded-full mx-auto my-5 flex justify-center items-center" sx={{ background: "#E8EEFD" }}>
                <LockResetOutlinedIcon className='text-blue-500 !text-5xl' />
            </Box>
            <Typography variant='h5' fontWeight={800} className='text-center'>تعديل الملف الشخصي</Typography>
            <Typography variant='body1' className='text-center !mt-5 text-gray-700'>قم بتحديث بيانات حسابك الأساسية</Typography>
            <TextField type='password' className='w-full !mt-5' label="كلمة المرور الأساسية" onChange={(e) => setPassword(e.target.value)} value={password} />
            <TextField type='password' className='w-full !mt-5' label="كلمة المرور الجديدة" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
            <TextField type='password' className='w-full !mt-5' label="تأكيد كلمة المرور" onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />
            <Box className="py-3 flex justify-between max-sm:flex-col">
                <Button onClick={updatePassword} variant='contained' className='w-2/5 !py-3 flex max-sm:w-full !text-white'>
                    {
                        sendWait ?
                            <CircularProgress size={20} className="" color="white" />
                            :
                            <>
                                حفظ
                                <SaveOutlinedIcon className='ml-2' />
                            </>

                    }
                </Button>
                <Button onClick={() => { resetInputs(); onClickCancel(); }} variant='contained' className='w-2/5 !py-3 flex !text-gray-500 !font-bold max-sm:w-full max-sm:!mt-3' color='inherit'>إلغاء</Button>
            </Box>
        </Box>
    );
}

export default UpdatePassword;