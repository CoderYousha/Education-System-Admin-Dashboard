import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import PieChartWithCenterLabel from "../../components/PieCenterLabel";
import SimpleAreaChart from "../../components/SimpleAreaChart";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useWaits } from "../../hooks/UseWait";
import Fetch from "../../services/Fetch";
import useSnackBar from "../../hooks/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";
import MoneyImage from "../../images/icons/money.png";
import CoursesImage from "../../images/icons/courses.png";
import TeachersImage from "../../images/icons/teachers.png";
import StudentsImage from "../../images/icons/students.png";
import ArrowIncrease from "../../images/icons/arrow-increase.png";
import ArrowDecrease from "../../images/icons/arrow-decrease.png";
import Arrow from "../../images/icons/arrow.png";
import { useTheme } from '@mui/material/styles';
import RequestDetails from "../../popup/RequestDetails";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePopups } from "../../hooks/UsePopups";
import { useConstants } from "../../hooks/UseConstants";
import { FormattedMessage } from "react-intl";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

function Dashboard() {
     const theme = useTheme();
     const navigate = useNavigate();
     const { wait } = useContext(AuthContext);
     const { setPopup } = usePopups();
     const { host, language } = useConstants();
     const { StyledTableCell, StyledTableRow } = useTableStyles();
     const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
     const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
     const [coursesRequests, setCoursesRequests] = useState([]);
     const [dashboard, setDashboard] = useState('');
     const visibleRequests = coursesRequests.slice(0, 4);
     const [courseId, setCourseId] = useState(null);
     const [operation, setOperation] = useState(null);
     const [fromDate, setFromDate] = useState('2026-01-01');
     const [toDate, setToDate] = useState('2026-01-01');
     const [request, setRequest] = useState('');

     {/* Get Courses Requests Function */}
     const getCoursesRequests = async () => {
          let result = await Fetch(host + '/courses?not_active=1', 'GET', null);

          if (result.status === 200) {
               const sorted = result.data.data.sort((a, b) => 
                    a.status === 'pending' ? -1 :
                    b.status === 'pending' ? 1 : 0
               );
               setCoursesRequests(sorted);
          }
     }

     {/* Change Course Status Function (Accepted, Rejected) */}
     const changeCourseStatus = async (courseId, status) => {
          setCourseId(courseId);
          setOperation(status);
          setSendWait(true);
          const formData = new FormData();
          formData.append('new_status', status);
          let result = await Fetch(host + `/admin/courses/${courseId}/change-status`, 'POST', formData);
          if (result.status === 200) {
               getCoursesRequests();
               setSnackBar('success', status === 'accepted' ? <FormattedMessage id='approved_msg' /> : <FormattedMessage id='rejected_msg' />);
               setCourseId(null);
          }
          setSendWait(false);
     }

     {/* Get Dashboard Function */}
     const getDashboard = async () => {
          let result = await Fetch(host + `/admin/reports/dashboard?from=${fromDate}&to=${toDate}`, 'GET', null);

          if (result.status === 200) {
               setDashboard(result.data.data);
          }
     }

     {/* Get Specefic Course Details */}
     const getCourseDetails = async (id) => {
          setRequest(coursesRequests.find((item) => item.id === id));
          setPopup('details', 'flex');
     }

     useEffect(() => {
          const getSequentialData = async () => {
               setGetWait(true);
               await getDashboard();
               await getCoursesRequests();
               setGetWait(false);
          }
          getSequentialData();
     }, []);

     useEffect(() => {
          getDashboard();
     }, [fromDate, toDate]);

     return (
          <>
               {
                    wait ?
                         <Box className="w-full h-screen relative flex justify-center items-center">
                              <CircularProgress size={70} />
                         </Box>
                         :
                         <Box sx={{ backgroundColor: theme.palette.background.default }}>
                              {
                                   getWait ?
                                        <Box className="w-4/5 h-screen relative flex justify-center items-center" sx={{float: language === 'en' && 'right'}}>
                                             <CircularProgress size={70} />
                                        </Box>
                                        :
                                        <>
                                             {/* Top Cards */}
                                             <Box className="w-4/5 flex justify-between mt-10 max-sm:block" sx={{float: language === 'en' && 'right'}} dir={language === 'en' ? "ltr" : "rtl"}>
                                                  {/* Total Students Card */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto">
                                                       <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id='total_students' /></Typography>
                                                       <Typography variant="h4" className="px-2 pt-3">{dashboard.cards.students.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900" sx={{left: language === 'en' && '80% !important'}}>
                                                            <img src={StudentsImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.students.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mx-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.students.percent}% <FormattedMessage id='more_month' /></Typography>
                                                                      </Box>
                                                                      : dashboard.cards.students.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.students.percent}% <FormattedMessage id='less_month' /></Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block"><FormattedMessage id='stable_growth' /></Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>

                                                  {/* Total Teachers Card */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id='total_teachers' /></Typography>
                                                       <Typography variant="h4" className="px-2 pt-3">{dashboard.cards.teachers.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900" sx={{left: language === 'en' && '80% !important'}}>
                                                            <img src={TeachersImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.teachers.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mx-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.teachers.percent}% <FormattedMessage id='more_month' /></Typography>
                                                                      </Box>
                                                                      : dashboard.cards.teachers.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.teachers.percent}% <FormattedMessage id='less_month' /></Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block"><FormattedMessage id='stable_growth' /></Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>

                                                  {/* Total Courses Card */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id='total_courses' /></Typography>
                                                       <Typography variant="h4" className="px-2 pt-3">{dashboard.cards.courses.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900" sx={{left: language === 'en' && '80% !important'}}>
                                                            <img src={CoursesImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.courses.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mx-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.courses.percent}% <FormattedMessage id='more_month' /></Typography>
                                                                      </Box>
                                                                      : dashboard.cards.courses.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.courses.percent}% <FormattedMessage id='less_month' /></Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block"><FormattedMessage id='stable_growth' /></Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>

                                                  {/* Total Revenue Card */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 px-2 pt-2 !text-sm"><FormattedMessage id='total_revenue' /></Typography>
                                                       <Typography variant="h4" className="px-2 pt-3">{dashboard.cards.revenue.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900" sx={{left: language === 'en' && '80% !important'}}>
                                                            <img src={MoneyImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.revenue.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mx-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.revenue.percent}% <FormattedMessage id='more_month' /></Typography>
                                                                      </Box>
                                                                      : dashboard.cards.revenue.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.revenue.percent}% <FormattedMessage id='less_month' /></Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block"><FormattedMessage id='stable_growth' /></Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>
                                             </Box>

                                             {/* Charts */}
                                             <Box className="grid grid-cols-2 w-4/5 mb-10 clearfix max-sm:grid-cols-1" sx={{direction: language === 'en' && 'rtl', float: language === 'en' && 'right'}}>
                                                  {/* Courses Distribution */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl mt-3 mx-2 max-sm:mx-auto" dir={language === 'en' ? "ltr": "rtl"}>
                                                       <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='distribution_courses' /></Typography>
                                                       <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm"><FormattedMessage id='main_categories' /></Typography>
                                                       <PieChartWithCenterLabel values={dashboard.categories.map(category => category.percent)} labels={dashboard.categories.map(category => language === 'en' ? category.name_en : category.name_ar)} counts={dashboard.categories.map(category => category.count)} />
                                                  </Box>

                                                  {/* Platform Style */}
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl mt-3 mr-2 relative max-sm:mx-auto" dir={language === 'en' ? "ltr" : "rtl"}>
                                                       <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='platform_style' /></Typography>
                                                       <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm"><FormattedMessage id='students_registrations' /></Typography>
                                                       <Box className="py-10"></Box>
                                                       <Box className="">
                                                            <SimpleAreaChart monthlyChart={dashboard.monthly_chart} from={fromDate} to={toDate} values={dashboard.monthly_chart.map(chart => chart.total)} months={dashboard.monthly_chart.map(chart => chart.month)} />
                                                       </Box>
                                                       <Box className="mb-2 float-left flex justify-around w-full" sx={{flexDirection: language === 'en' && 'row-reverse'}}>
                                                            <TextField value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" label={<FormattedMessage id='to' />} className="z-0" />
                                                            <TextField value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" label={<FormattedMessage id='from' />} className="z-0" />
                                                       </Box>
                                                  </Box>
                                             </Box>

                                             {/* Approval Requests Table */}
                                             <Box className="w-4/5 rounded-lg mx-2 px-2" sx={{float: language === 'en' && 'right'}} dir={language === 'en' ? "ltr" : "rtl"}>
                                                  <Box sx={{ backgroundColor: theme.palette.background.default }} className="mr-2 !rounded-lg overflow-hidden">
                                                       <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2">
                                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='approval_requests' /></Typography>
                                                            <Typography onClick={() => navigate('/accept-requests')} variant="body1" className="cursor-pointer text-blue-500 max-sm:!text-sm"><FormattedMessage id='view_all_requests' /> 
                                                                 {
                                                                      language === 'en' ? 
                                                                      <ArrowForwardIosOutlinedIcon />
                                                                      :
                                                                      <ArrowBackIosNewIcon />
                                                                 }
                                                            </Typography>
                                                       </Box>
                                                       <Box>
                                                            <TableContainer className="!rounded-none" component={Paper} dir={language === 'en' ? "ltr" : "rtl"}>
                                                                 <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                                      <TableHead className="bg-gray-200">
                                                                           <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='request_id' /></StyledTableCell>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='course_name' /></StyledTableCell>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='teacher_name' /></StyledTableCell>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='request_date' /></StyledTableCell>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='status' /></StyledTableCell>
                                                                                <StyledTableCell align={language === 'en' ? 'left' : 'right'}><FormattedMessage id='procedures' /></StyledTableCell>
                                                                           </TableRow>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                           {visibleRequests.map((request, index) => (
                                                                                <StyledTableRow key={index}>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row" className="cursor-pointer" onClick={() => {request.status !== 'rejected' && request.status !== 'accepted' && getCourseDetails(request.id)}}>{request.id}</StyledTableCell>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'} component="th" scope="row">
                                                                                          {language === 'en' ? request.name_en : request.name_ar}
                                                                                     </StyledTableCell>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mx-2">{request.teacher.first_name} {request.teacher.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{request.teacher.first_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'}>{request.created_at.split(" ")[0]}</StyledTableCell>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'}><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: request.status === 'accepted' ? "#CCFFCC" : request.status === 'rejected' ? "#FF9999" : "#FCF0CF", color: request.status === 'accepted' ? "green" : request.status === 'rejected' ? "red" : "orange" }}>{request.status === 'accepted' ? <FormattedMessage id='approved' /> : request.status === 'rejected' ? <FormattedMessage id='rejected' /> : <FormattedMessage id='wait_approval' />}</Box></StyledTableCell>
                                                                                     <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!flex justify-between" sx={{flexDirection: language === 'en' && 'row-reverse'}}>
                                                                                          <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'rejected')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                                                               {sendWait && courseId === request.id && operation === 'rejected' ?
                                                                                                    <CircularProgress size={20} className="" color="white" />
                                                                                                    :
                                                                                                    <FormattedMessage id='reject' />
                                                                                               }
                                                                                          </Button>
                                                                                          <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'accepted')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                                                               {sendWait && courseId === request.id && operation === 'accepted' ?
                                                                                                    <CircularProgress size={20} className="" color="white" />
                                                                                                    :
                                                                                                    <FormattedMessage id='approve' />
                                                                                               }
                                                                                          </Button>
                                                                                     </StyledTableCell>
                                                                                </StyledTableRow>
                                                                           ))}
                                                                      </TableBody>
                                                                 </Table>
                                                            </TableContainer>
                                                       </Box>
                                                  </Box>
                                             </Box>

                                             {/* Approval Requests Details Popup */}
                                             <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0" sx={{right: language === 'en' && '0'}}>
                                                  <RequestDetails onClickClose={() => setPopup('details', 'none')} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request} />
                                             </Box>

                                             {/* Snackbar Alert */}
                                             <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                                        </>
                              }
                         </Box>
               }
          </>
     );
}

export default Dashboard;