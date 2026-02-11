import { Box, Typography, useTheme } from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Sidebar () {
     const theme = useTheme();
     const {wait} = useContext(AuthContext);

     const items = [
          {
               'title': 'لوحة التحكم',
               'icon': <DashboardOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../dashboard'
          },
          {
               'title': 'طلبات الموافقة',
               'icon': <CheckCircleOutlineIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../accept-requests',
          },
          {
               'title': 'الطلاب',
               'icon': <SchoolOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../students',
          },
          {
               'title': 'المدرسون',
               'icon': <PeopleOutlineIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../teachers',
          },
          {
               'title': 'الدورات',
               'icon': <CastForEducationOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../courses',
          },
          {
               'title': 'الإعلانات',
               'icon': <CampaignOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../ads',
          },
          {
               'title': 'المالية',
               'icon': <AccountBalanceWalletOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../financial',
          },
          {
               'title': 'التقارير',
               'icon': <AssessmentOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../reports',
          },
          {
               'title': 'الإعدادات',
               'icon': <SettingsOutlinedIcon fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../settings',
          },
          {
               'title': 'تسجيل الخروج',
               'icon': <LogoutOutlinedIcon color="error" fontSize="medium" className="mr-2 max-sm:mx-auto" />,
               'link': '../logout',
               'color': 'red'
          },
     ];
     return (
          <>
               {
                    !wait &&
                    <Box sx={{backgroundColor: theme.palette.background.paper}} className="bg-white w-1/5 h-screen fixed right-0 top-0 shadow-sm shadow-neutral-400 max-sm:w-1/6 overflow-y-scroll none-view-scroll z-50">
                         <Box className="bg-red-700 w-4/5 mx-auto mt-5 text-white font-bold text-center py-3">LOGO HERE</Box>
                         <Box className="mt-10 cursor-pointer">
                              {
                                   items.map( (item, index) => 
                                        <NavLink key={index} to={item.link} className="flex items-center w-4/5 mx-auto py-2 rounded-lg mt-5" dir="rtl">
                                             {item.icon}
                                             <Typography variant="h6" className="px-2 max-sm:hidden" style={{color: item.color}}>{item.title}</Typography> 
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