import { useContext, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { useWaits } from "../../hooks/UseWait";
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from "@mui/material";
import { useWallet } from "../../hooks/UseWallet";
import Fetch from "../../services/Fetch";
import { buildWalletFormData } from "../../helper/WalletFormData";
import { usePopups } from "../../hooks/UsePopups";
import QrCodeWallet from "../../popup/QrCodeWallet";
import { FormattedMessage } from "react-intl";

function Wallet() {
    const theme = useTheme();
    const { wait } = useContext(AuthContext);
    const { setPopup } = usePopups();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { amount, setAmount } = useWallet();
    const [qrCode, setQrCode] = useState('');

    const addToWallet = async () => {
        setSendWait(true);
        const formData = buildWalletFormData({ amount: amount });
        let result = await Fetch(host + `/admin/wallet/charge/create`, 'POST', formData);

        if (result.status === 200) {
            setQrCode(result.data.data);
            setPopup('qrcode', 'flex');
        }
        setSendWait(false);
    }

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir="rtl" sx={{float: language === 'en' && 'right'}}>
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="w-2/5 mx-auto text-center mt-10 rounded-xl py-10 px-5">
                                <Typography variant="h4" fontWeight={800}><FormattedMessage id="fill_wallet" /></Typography>
                                <TextField label={<FormattedMessage id="amount" />} className="w-full !my-10 !z-0" variant="outlined" onChange={(e) => setAmount(e.target.value)} />
                                <Button onClick={addToWallet} className="w-4/5" variant="contained">
                                    {
                                        sendWait ?
                                            <CircularProgress size={20} className="" color="white" />
                                            :
                                            <Box>
                                                <FormattedMessage id="create" />
                                            </Box>
                                    }
                                </Button>
                            </Box>
                        </Box>

                        {/* Qr Code Wallet Popup */}
                        <Box id="qrcode" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0">
                            <QrCodeWallet value={qrCode.qr_data} onClickClose={() => setPopup('qrcode', 'none')} />
                        </Box>
                    </Box>
            }
        </>
    );
}


export default Wallet;