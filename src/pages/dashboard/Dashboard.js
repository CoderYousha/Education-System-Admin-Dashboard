import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import PieChartWithCenterLabel from "../../components/PieCenterLabel";
import SimpleAreaChart from "../../components/SimpleAreaChart";
import styled from "styled-components";
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

function Dashboard() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const language = localStorage.getItem('language') || 'ar';
     const { wait } = useContext(AuthContext);
     const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
     const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
     const [coursesRequests, setCoursesRequests] = useState([]);
     const [dashboard, setDashboard] = useState('');
     const visibleRequests = coursesRequests.slice(0, 4);
     const [courseId, setCourseId] = useState(null);
     const [operation, setOperation] = useState(null);
     const [fromDate, setFromDate] = useState('');
     const [toDate, setToDate] = useState('');
     const [request, setRequest] = useState('');
     const theme = useTheme();

     const data = [
          'كانون الثاني',
          'شباط',
          'آذار',
          'نيسان',
          'أيار',
          'حزيران',
          'تموز',
          'آب',
          'أيلول',
          'تشرين الأول',
          'تشرين الثاني',
          'كانون الأول',
     ];

     const StyledTableCell = styled(TableCell)(({ theme }) => ({
          [`&.${tableCellClasses.head}`]: {
          },
          [`&.${tableCellClasses.body}`]: {
               fontSize: 14,
          },
     }));

     const StyledTableRow = styled(TableRow)(({ theme }) => ({
          '&:nth-of-type(odd)': {
          },
          '&:last-child td, &:last-child th': {
               border: 0,
          },
     }));

     const getCoursesRequests = async () => {
          let result = await Fetch(host + '/courses?not_active=1', 'GET', null);

          if (result.status === 200) {
               setCoursesRequests(result.data.data);
          }
     }

     const changeCourseStatus = async (courseId, status) => {
          setCourseId(courseId);
          setOperation(status);
          setSendWait(true);
          let result = await Fetch(host + `/admin/courses/${courseId}/change-status`, 'POST', JSON.stringify({'new_status': status}));
          if (result.status === 200) {
               getCoursesRequests();
               setSnackBar('success', status === 'accepted' ? 'تم التفعيل بنجاح' : 'تم الرفض بنجاح');
               setCourseId(null);
          }

          setSendWait(false);
     }

     const getDashboard = async () => {
          let result = await Fetch(host + `/admin/reports/dashboard?from=${fromDate}&to=${toDate}`, 'GET', null);

          if(result.status === 200) {
               setDashboard(result.data.data);
          }
     }

     const getCourseDetails = async (id) => {
          setRequest(coursesRequests.find((item) => item.id == id));
          console.log(coursesRequests.find((item) => item.id == id));
          document.getElementById('popup').style.display = 'block';
          
     }

     const closePopup = () => {
          document.getElementById('popup').style.display = 'none';
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
          console.log(dashboard.monthly_chart);
     },[fromDate, toDate]);

     return (
          <>
               {
                    wait || getWait ?
                         <Box className="w-full h-screen relative flex justify-center items-center">
                              <CircularProgress size={70} />
                         </Box>
                         :
                         <Box sx={{backgroundColor: theme.palette.background.default}}>
                              <Sidebar />
                              <Header />
                              <Box className="w-4/5 flex justify-between mt-10 max-sm:block" dir="rtl">
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto">
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
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
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
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
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
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="rounded-xl bg-white w-3/6 mx-2 h-32 relative shadow-xl max-sm:w-5/6 max-sm:mx-auto max-sm:mt-2">
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
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="bg-white rounded-xl mt-3 mx-2 max-sm:mx-auto" dir="rtl">
                                        <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">توزيع الدورات</Typography>
                                        <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm">حسب الفئات الرئيسية</Typography>
                                        <PieChartWithCenterLabel values={dashboard.categories.map(category => category.percent)} labels={dashboard.categories.map(category => language == 'en' ? category.name_en: category.name_ar)} counts={dashboard.categories.map(category => category.count)}/>
                                   </Box>
                                   <Box sx={{backgroundColor: theme.palette.background.paper}} className="bg-white rounded-xl mt-3 mr-2 relative max-sm:mx-auto" dir="rtl">
                                        <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">نمط المنصة</Typography>
                                        <Typography variant="h6" className="px-3 text-gray-400 max-sm:!text-sm">تسجيلات الطلاب خلال آخر 6 أشهر</Typography>
                                        <Box className="py-10"></Box>
                                        <Box className="">
                                             <SimpleAreaChart monthlyChart={dashboard.monthly_chart} from={fromDate} to={toDate} values={dashboard.monthly_chart.map(chart => chart.total)} months={dashboard.monthly_chart.map(chart => chart.month)} />
                                        </Box>
                                        <Box className="mb-2 float-left flex justify-around w-full">
                                             <TextField value="2026-01-01" onChange={(e) => setToDate(e.target.value)} type="date" label="To" className="z-0"/>
                                             <TextField value="2026-01-01" onChange={(e) => setFromDate(e.target.value)} type="date" label="From" className="z-0"/>
                                        </Box>
                                   </Box>
                              </Box>
                              <Box className="w-4/5 rounded-xl mx-2 px-2" dir="rtl">
                                   <Box className="bg-white mr-2 rounded-xl">
                                        <Box sx={{backgroundColor: theme.palette.background.paper}} className="flex justify-between items-center px-2">
                                             <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg">طلبات الموافقة المعلقة</Typography>
                                             <Typography variant="body1" className="cursor-pointer max-sm:!text-sm">عرض جميع الطلبات <ArrowBackIosNewIcon /></Typography>
                                        </Box>
                                        <Box>
                                             <TableContainer component={Paper} dir="rtl">
                                                  <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                       <TableHead className="bg-gray-200">
                                                            <TableRow sx={{backgroundColor: theme.palette.background.paper}}>
                                                                 <StyledTableCell align="right">اسم الدورة</StyledTableCell>
                                                                 <StyledTableCell align="right">اسم المدرس</StyledTableCell>
                                                                 {/* <StyledTableCell align="right">نوع المحتوى</StyledTableCell> */}
                                                                 <StyledTableCell align="right">تاريخ الطلب</StyledTableCell>
                                                                 <StyledTableCell align="right">الحالة</StyledTableCell>
                                                                 <StyledTableCell align="right">الإجراءات</StyledTableCell>
                                                            </TableRow>
                                                       </TableHead>
                                                       <TableBody>
                                                            {visibleRequests.map((request, index) => (
                                                                 <StyledTableRow key={index}>
                                                                      <StyledTableCell align="right" component="th" scope="row">
                                                                           {language === 'en' ? request.name_en : request.name_ar}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell align="right" className="!flex justify-end items-center"><Box className="mr-2">{request.teacher.first_name} {request.teacher.last_name}</Box><Box className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center font-bold">{request.teacher.first_name.charAt(0)}</Box></StyledTableCell>
                                                                      {/* <StyledTableCell align="right">{language === 'en' ? request.category.name_en : request.category.name_ar}</StyledTableCell> */}
                                                                      <StyledTableCell align="right">{request.created_at}</StyledTableCell>
                                                                      <StyledTableCell align="right"><Box className="text-center py-1 rounded-lg font-bold" sx={{backgroundColor: request.status === 'accepted'? "#CCFFCC" : request.status === 'rejected' ? "#FF9999" : "#FCF0CF", color: request.status === 'accepted'? "green" : request.status === 'rejected' ? "red" : "orange"}}>{request.status === 'accepted' ? 'تمت الموافقة' : request.status === 'rejected' ? 'تم الرفض' : 'بانتظار الموافقة'}</Box></StyledTableCell>
                                                                      <StyledTableCell align="right" className="!flex justify-between">
                                                                           <Button onClick={() => getCourseDetails(request.id)} disabled={request.status === 'rejected' || request.status === 'accepted'} className="h-8 !bg-gray-200 !text-gray-700">عرض التفاصيل</Button>
                                                                           <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'rejected')} variant="contained" sx={{backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted'? '#666666 !important' : ''}} className="mr-2 h-8 !bg-red-300 !text-red-600 !font-bold hover:!bg-red-600 hover:!text-white">
                                                                           {sendWait && courseId === request.id && operation === 'rejected' ?
                                                                                <CircularProgress size={20} className="" color="white" />
                                                                                :
                                                                                'رفض'
                                                                           }
                                                                           </Button>
                                                                           <Button disabled={request.status === 'rejected' || request.status === 'accepted'} onClick={() => changeCourseStatus(request.id, 'accepted')} variant="contained" sx={{backgroundColor: request.status === 'rejected' || request.status === 'accepted' ? '#F2F2F2 !important' : '', color: request.status === 'rejected' || request.status === 'accepted'? '#666666 !important' : ''}} className="!font-bold h-8 mx-2 !text-green-600 !bg-green-300 hover:!bg-green-600 hover:!text-white">
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
                              <Box id="popup" className="w-screen h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden max-sm:left-0">
                                   <RequestDetails onClickClose={closePopup} onClickAccept={changeCourseStatus} onClickReject={changeCourseStatus} request={request}/>
                              </Box>
                              <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                         </Box>
               }
          </>
     );
}

export default Dashboard;