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

function Dashboard() {
     const { host, language } = useConstants();
     const { wait } = useContext(AuthContext);
     const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
     const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
     const { StyledTableCell, StyledTableRow } = useTableStyles();
     const { setPopup } = usePopups();
     const [coursesRequests, setCoursesRequests] = useState([]);
     const [dashboard, setDashboard] = useState('');
     const visibleRequests = coursesRequests.slice(0, 4);
     const [courseId, setCourseId] = useState(null);
     const [operation, setOperation] = useState(null);
     const [fromDate, setFromDate] = useState('2026-01-01');
     const [toDate, setToDate] = useState('2026-01-01');
     const [request, setRequest] = useState('');
     const theme = useTheme();
     const navigate = useNavigate();

     const getCoursesRequests = async () => {
          let result = await Fetch(host + '/courses?not_active=1', 'GET', null);

          if (result.status === 200) {
               const sorted = result.data.data.sort((a, b) => 
                    a.status === 'pending' ? -1 :
                    b.status === 'pending' ? 1 : 0
               );
               setCoursesRequests(sorted);
               // setCoursesRequests(result.data.data);
          }
     }

     const changeCourseStatus = async (courseId, status) => {
          setCourseId(courseId);
          setOperation(status);
          setSendWait(true);
          const formData = new FormData();
          formData.append('new_status', status);
          let result = await Fetch(host + `/admin/courses/${courseId}/change-status`, 'POST', formData);
          if (result.status === 200) {
               getCoursesRequests();
               setSnackBar('success', status === 'accepted' ? 'تم التفعيل بنجاح' : 'تم الرفض بنجاح');
               setCourseId(null);
          }
          setSendWait(false);
     }

     const getDashboard = async () => {
          let result = await Fetch(host + `/admin/reports/dashboard?from=${fromDate}&to=${toDate}`, 'GET', null);

          if (result.status === 200) {
               setDashboard(result.data.data);
          }
     }

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
                                        <Box className="w-4/5 h-screen relative flex justify-center items-center">
                                             <CircularProgress size={70} />
                                        </Box>
                                        :
                                        <>
                                             <Box className="w-4/5 flex justify-between mt-10 max-sm:block" dir="rtl">
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto">
                                                       <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي الطلاب</Typography>
                                                       <Typography variant="h4" className="pr-2 pt-3">{dashboard.cards.students.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900">
                                                            <img src={StudentsImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.students.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.students.percent}% زيادة عن الشهر الماضي</Typography>
                                                                      </Box>
                                                                      : dashboard.cards.students.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.students.percent}% أقل عن الشهر الماضي</Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block">نمو مستقر</Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي المدرسين</Typography>
                                                       <Typography variant="h4" className="pr-2 pt-3">{dashboard.cards.teachers.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900">
                                                            <img src={TeachersImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.teachers.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.teachers.percent}% زيادة عن الشهر الماضي</Typography>
                                                                      </Box>
                                                                      : dashboard.cards.teachers.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.teachers.percent}% أقل عن الشهر الماضي</Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block">نمو مستقر</Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي الدورات</Typography>
                                                       <Typography variant="h4" className="pr-2 pt-3">{dashboard.cards.courses.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900">
                                                            <img src={CoursesImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.courses.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.courses.percent}% زيادة عن الشهر الماضي</Typography>
                                                                      </Box>
                                                                      : dashboard.cards.courses.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.courses.percent}% أقل عن الشهر الماضي</Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block">نمو مستقر</Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
                                                       <Typography variant="h6" className="text-gray-500 pr-2 pt-2 !text-sm">إجمالي الإيرادات</Typography>
                                                       <Typography variant="h4" className="pr-2 pt-3">{dashboard.cards.revenue.total}</Typography>
                                                       <Box className="bg-blue-100 w-10 h-10 rounded-lg flex justify-center items-center absolute top-5 left-5 text-blue-900">
                                                            <img src={MoneyImage} />
                                                       </Box>
                                                       <Box>
                                                            {
                                                                 dashboard.cards.revenue.percent > 0 ?
                                                                      <Box>
                                                                           <img src={ArrowIncrease} className="w-4 h-4 inline-block mr-2" />
                                                                           <Typography variant="body2" className="text-green-500 inline-block">+{dashboard.cards.revenue.percent}% زيادة عن الشهر الماضي</Typography>
                                                                      </Box>
                                                                      : dashboard.cards.revenue.percent < 0 ?
                                                                           <Box>
                                                                                <img src={ArrowDecrease} className="w-4 h-4 inline-block mr-2" />
                                                                                <Typography variant="body2" className="text-red-500 inline-block">-{dashboard.cards.revenue.percent}% أقل عن الشهر الماضي</Typography>
                                                                           </Box>
                                                                           :
                                                                           <Box>
                                                                                <img src={Arrow} className="w-4 h-4 inline-block mx-2" />
                                                                                <Typography variant="body2" className="inline-block">نمو مستقر</Typography>
                                                                           </Box>
                                                            }
                                                       </Box>
                                                  </Box>
                                             </Box>
                                             <Box className="grid grid-cols-2 w-4/5 mb-10 clearfix max-sm:grid-cols-1">
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl mt-3 mx-2 max-sm:mx-auto" dir="rtl">
                                                       <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">توزيع الدورات</Typography>
                                                       <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm">حسب الفئات الرئيسية</Typography>
                                                       <PieChartWithCenterLabel values={dashboard.categories.map(category => category.percent)} labels={dashboard.categories.map(category => language === 'en' ? category.name_en : category.name_ar)} counts={dashboard.categories.map(category => category.count)} />
                                                  </Box>
                                                  <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl mt-3 mr-2 relative max-sm:mx-auto" dir="rtl">
                                                       <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">نمط المنصة</Typography>
                                                       <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm">تسجيلات الطلاب خلال آخر 6 أشهر</Typography>
                                                       <Box className="py-10"></Box>
                                                       <Box className="">
                                                            <SimpleAreaChart monthlyChart={dashboard.monthly_chart} from={fromDate} to={toDate} values={dashboard.monthly_chart.map(chart => chart.total)} months={dashboard.monthly_chart.map(chart => chart.month)} />
                                                       </Box>
                                                       <Box className="mb-2 float-left flex justify-around w-full">
                                                            <TextField value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" label="To" className="z-0" />
                                                            <TextField value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" label="From" className="z-0" />
                                                       </Box>
                                                  </Box>
                                             </Box>
                                             <Box className="w-4/5 rounded-lg mx-2 px-2" dir="rtl">
                                                  <Box sx={{ backgroundColor: theme.palette.background.default }} className="mr-2 !rounded-lg overflow-hidden">
                                                       <Box sx={{ backgroundColor: theme.palette.background.paper }} className="flex justify-between items-center px-2">
                                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">طلبات الموافقة</Typography>
                                                            <Typography onClick={() => navigate('/accept-requests')} variant="body1" className="cursor-pointer text-blue-500 max-sm:!text-sm">عرض جميع الطلبات <ArrowBackIosNewIcon /></Typography>
                                                       </Box>
                                                       <Box>
                                                            <TableContainer className="!rounded-none" component={Paper} dir="rtl">
                                                                 <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                                      <TableHead className="bg-gray-200">
                                                                           <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                                                <StyledTableCell align="right">رقم الطلب</StyledTableCell>
                                                                                <StyledTableCell align="right">اسم الدورة</StyledTableCell>
                                                                                <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                                                <StyledTableCell align="right">تاريخ الطلب</StyledTableCell>
                                                                                <StyledTableCell align="right">الحالة</StyledTableCell>
                                                                                <StyledTableCell align="right">الإجراءات</StyledTableCell>
                                                                           </TableRow>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                           {visibleRequests.map((request, index) => (
                                                                                <StyledTableRow key={index}>
                                                                                     <StyledTableCell align="right" component="th" scope="row" className="cursor-pointer" onClick={() => {request.status !== 'rejected' && request.status !== 'accepted' && getCourseDetails(request.id)}}>{request.id}</StyledTableCell>
                                                                                     <StyledTableCell align="right" component="th" scope="row">
                                                                                          {language === 'en' ? request.name_en : request.name_ar}
                                                                                     </StyledTableCell>
                                                                                     <StyledTableCell align="right" className=""><Box className="flex flex-row-reverse items-center justify-end"><Box className="mr-2">{request.teacher.first_name} {request.teacher.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{request.teacher.first_name.charAt(0)}</Box><Box className=""></Box></Box></StyledTableCell>
                                                                                     <StyledTableCell align="right">{request.created_at.split(" ")[0]}</StyledTableCell>
                                                                                     <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{ backgroundColor: request.status === 'accepted' ? "#CCFFCC" : request.status === 'rejected' ? "#FF9999" : "#FCF0CF", color: request.status === 'accepted' ? "green" : request.status === 'rejected' ? "red" : "orange" }}>{request.status === 'accepted' ? 'تمت الموافقة' : request.status === 'rejected' ? 'تم الرفض' : 'بانتظار الموافقة'}</Box></StyledTableCell>
                                                                                     <StyledTableCell align="right" className="!flex justify-between">
                                                                                          {/* <Button onClick={() => getCourseDetails(request.id)} disabled={request.status === 'rejected' || request.status === 'accepted'} className="h-8 !bg-gray-200 !text-gray-700">عرض التفاصيل</Button> */}
                                                                                          <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'rejected')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                                                               {sendWait && courseId === request.id && operation === 'rejected' ?
                                                                                                    <CircularProgress size={20} className="" color="white" />
                                                                                                    :
                                                                                                    'رفض'
                                                                                               }
                                                                                          </Button>
                                                                                          <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'accepted')} variant="contained" sx={{ backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted' ? '#666666 !important' : '' }} className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
                                                                                               {sendWait && courseId === request.id && operation === 'accepted' ?
                                                                                                    <CircularProgress size={20} className="" color="white" />
                                                                                                    :
                                                                                                    'قبول'
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
                                             <Box id="details" className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 justify-center hidden max-sm:left-0">
                                                  <RequestDetails onClickClose={() => setPopup('details', 'none')} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request} />
                                             </Box>
                                             <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                                        </>
                              }
                         </Box>
               }
          </>
     );
}

export default Dashboard;