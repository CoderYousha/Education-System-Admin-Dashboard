import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationImage from '../images/icons/notification.png';
import VideoImage from '../images/icons/video.png';
import MoneyImage from '../images/icons/money2.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ColorModeContext } from "../theme/ThemeProviderWrapper";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SunnyIcon from '@mui/icons-material/Sunny';

function Header() {
     const { profile } = useContext(AuthContext);
     const theme = useTheme();
     const colorMode = useContext(ColorModeContext);

     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);
     const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
          setAnchorEl(null);
     };

     const openNotification = async () => {
          document.getElementById('notification-box').style.display = 'block';
     }
     const closeNotification = async () => {
          
          document.getElementById('notification-box').style.display = 'none';
     }

     useEffect(() => { 
          function handleClickOutside(event) {
               if (!event.target.closest("#notification-box") && !event.target.closest("img[alt='notification']")) { 
                    closeNotification();
               } } 
          document.addEventListener("mousedown", handleClickOutside); return () => { document.removeEventListener("mousedown", handleClickOutside); }; 
     }, []);
     return (
          <React.Fragment>
               <Box sx={{backgroundColor: theme.palette.background.paper}} className="flex justify-between items-center px-2 py-3 w-4/5 bg-white max-sm:w-5/6" dir="rtl">
                    <Typography variant="h4" className="font-bold pr-5 max-sm:!text-lg max-sm:!ml-3">لوحة تحكم المسؤول</Typography>
                    <Box className="flex items-center w-1/5">
                         <NotificationsNoneOutlinedIcon onClick={() => openNotification()} src={NotificationImage} alt="notification" className="w-6 h-6 cursor-pointer max-sm:ml-3" />
                              {
                                   theme.palette.mode == 'dark'?
                                   <SunnyIcon onClick={colorMode.toggleColorMode} fontSize="medium" className="cursor-pointer mx-3 max-sm:ml-3" />
                                   :
                                   <WbSunnyOutlinedIcon onClick={colorMode.toggleColorMode} fontSize="medium" className="cursor-pointer mx-3 max-sm:ml-3" />
                              }
                         <Box className="flex items-center w-4/5 cursor-pointer" onClick={handleClick}>
                              <Box className="w-10 h-10 text-white rounded-full bg-blue-700 flex justify-center items-center">
                                   <PermIdentityIcon fontSize="medium" />
                              </Box>
                              <Box className="mr-2">
                                   <Typography variant="body1" className="max-sm:hidden">{profile.first_name} {profile.last_name}</Typography>
                                   <Typography variant="body2" className="max-sm:hidden">المدير العام</Typography>
                              </Box>
                         </Box>
                    </Box>
               </Box>
               <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                         paper: {
                              elevation: 0,
                              sx: {
                                   overflow: 'visible',
                                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                   mt: 1.5,
                                   '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                   },
                                   '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                   },
                              },
                         },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
               >
                    <MenuItem onClick={handleClose}>
                         <ListItemIcon>
                              <PermIdentityIcon fontSize="small" />
                         </ListItemIcon>
                         Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                         <ListItemIcon>
                              <Settings fontSize="small" />
                         </ListItemIcon>
                         Settings
                    </MenuItem>
                    <MenuItem className="!text-red-500" onClick={handleClose}>
                         <ListItemIcon className="!text-red-500">
                              <Logout fontSize="small" />
                         </ListItemIcon>
                         Logout
                    </MenuItem>
               </Menu>
               <Box sx={{backgroundColor: theme.palette.background.paper}} id="notification-box" className="w-1/3 min-h-20 bg-white z-50 shadow-md rounded-lg absolute top-15 left-44 max-sm:w-8/12 max-sm:left-10 max-sm:top-16 hidden" dir="rtl">
                    <Box className="flex justify-between items-center px-5 py-3">
                         <Typography variant="h6" className="font-bold max-sm:!text-sm">الإشعارات</Typography>
                         <Typography variant="body2" className="font-bold text-blue-800 cursor-pointer max-sm:!text-sm">تحديد الكل كمقروءة</Typography>
                    </Box>
                    <Box className="flex items-center py-2">
                         <img src={VideoImage} className="w-5 h-5 mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                         <Box className="">
                              <Box className="flex">
                                   <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                   <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف ملف جديد للموافقة</Typography>
                              </Box>
                              <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                         </Box>
                    </Box>
                    <Box className="flex items-center py-2">
                         <img src={MoneyImage} className="w-5 h-5 mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                         <Box className="">
                              <Box className="flex">
                                   <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                   <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف ملف جديد للموافقة</Typography>
                              </Box>
                              <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                         </Box>
                    </Box>
                    <Box className="flex items-center py-2">
                         <img src={VideoImage} className="w-5 h-5 mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                         <Box className="">
                              <Box className="flex">
                                   <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                   <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف ملف جديد للموافقة</Typography>
                              </Box>
                              <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                         </Box>
                    </Box>
                    <Box className="flex items-center py-2">
                         <img src={MoneyImage} className="w-5 h-5 mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                         <Box className="">
                              <Box className="flex">
                                   <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                   <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف ملف جديد للموافقة</Typography>
                              </Box>
                              <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                         </Box>
                    </Box>
                    <Box className="flex items-center py-2">
                         <img src={VideoImage} className="w-5 h-5 mx-5 mb-3 max-sm:w-4 max-sm:h-4" />
                         <Box className="">
                              <Box className="flex">
                                   <Typography variant="body1" className="!ml-1 text-cyan-600 !font-bold max-sm:!text-sm"> د. أحمد الخطيب </Typography>
                                   <Typography variant="body1" className="mr-1 max-sm:!text-sm">أضاف ملف جديد للموافقة</Typography>
                              </Box>
                              <Typography variant="body2" className="text-gray-400 mx-5 mb-3">12/7/2025 13:07 p</Typography>
                         </Box>
                    </Box>
                    <Box className="text-center text-gray-500 py-2 cursor-pointer max-sm:!text-sm">عرض الكل <ArrowBackIosNewIcon /></Box>
               </Box>
          </React.Fragment>
     );
}

export default Header;