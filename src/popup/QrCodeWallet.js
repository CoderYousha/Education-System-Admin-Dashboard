import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

function QrCodeWallet({ onClickClose, value }) {
    const theme = useTheme();
    const qrWrapperRef = useRef(null);

    const downloadQR = () => {
        if (!qrWrapperRef.current) return;
        const svg = qrWrapperRef.current.querySelector("svg");
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngFile;
            link.download = "qr-code.png";
            link.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-2/4 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll !z-50 max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative" dir="rtl">
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id="qr_code_description" /></Typography>
            <CloseIcon onClick={() => { onClickClose(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" />
            <Divider className="!my-5" />
            <Box ref={qrWrapperRef} className="relative w-full h-32 rounded-xl mt-5 flex flex-col items-center justify-center cursor-pointer">
                {
                    value &&
                    <QRCode value={value} size={500} />
                }
            </Box>
            <Box className="w-4/5 mx-auto">
                <Button onClick={downloadQR} variant="contained" className="w-full !my-10"><FormattedMessage id="download" /></Button>
            </Box>
        </Box>
    );
}

export default QrCodeWallet;