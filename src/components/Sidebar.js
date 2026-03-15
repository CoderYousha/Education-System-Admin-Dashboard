import { Box, Typography, useTheme } from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LogoImage from "../images/logo/logo.png";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";

function Sidebar() {
     const { language } = useConstants();
     const theme = useTheme();
     const { wait } = useContext(AuthContext);

     const items = [
          {
               'title': <FormattedMessage id="dashboard" />,
               'icon': <DashboardOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../dashboard'
          },
          {
               'title': <FormattedMessage id="notifications" />,
               'icon': <NotificationsNoneOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../notifications',
          },
          {
               'title': <FormattedMessage id="approval_requests" />,
               'icon': <CheckCircleOutlineIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../accept-requests',
          },
          {
               'title': <FormattedMessage id="students" />,
               'icon': <SchoolOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../students',
          },
          {
               'title': <FormattedMessage id="teachers" />,
               'icon': <PeopleOutlineIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../teachers',
          },
          {
               'title': <FormattedMessage id="courses" />,
               'icon': <CastForEducationOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../courses',
          },
          {
               'title': <FormattedMessage id="ads" />,
               'icon': <CampaignOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../ads',
          },
          {
               'title': <FormattedMessage id="financial" />,
               'icon': <AccountBalanceWalletOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../financial',
          },
          {
               'title': <FormattedMessage id="wallet" />,
               'icon': <WalletOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
               'link': '../wallet',
          },
          // {
          //      'title': <FormattedMessage id="reports" />,
          //      'icon': <AssessmentOutlinedIcon fontSize="medium" className="mx-2 max-sm:mx-auto" />,
          //      'link': '../reports',
          // },
     ];
     return (
          <>
               {
                    !wait && //sx={{backgroundColor: theme.palette.background.paper}}
                    <Box sx={{ backgroundImage: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'linear-gradient(to bottom, #0D358C, #040E26)', left: language === 'en' && '0% !important' }} className="text-white w-1/5 h-screen fixed right-0 top-0 shadow-sm shadow-neutral-400 max-sm:w-1/6 overflow-y-scroll none-view-scroll z-50">
                         {/* <Box className="bg-red-700 w-4/5 mx-auto mt-5 text-white font-bold text-center py-3">LOGO HERE</Box> */}
                         <Box className="w-4/5 mx-auto mt-5 text-white font-bold text-center py-3">
                              <img src={LogoImage} className="w-full" />
                         </Box>
                         <Box className="mt-10 cursor-pointer">
                              {
                                   items.map((item, index) =>
                                        <NavLink key={index} to={item.link} className="flex items-center w-4/5 mx-auto py-2 rounded-lg mt-5" dir={language === 'en' ? 'ltr' : 'rtl'}>
                                             {item.icon}
                                             <Typography variant="h6" className="px-2 max-sm:hidden" style={{ color: item.color }}>{item.title}</Typography>
                                        </NavLink>
                                   )
                              }
                         </Box>
                    </Box>
               }
          </>
     );
}

export default Sidebar;