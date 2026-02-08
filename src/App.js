import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/colors.css';
import './styles/constants.css';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import { useTheme } from '@mui/material/styles';
import DashboardRoutes from './routes/DashboardRoutes';
import StudentsRoutes from './routes/StudentsRoutes';
import TeachersRoutes from './routes/TeachersRoutes';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CoursesRoutes from './routes/CoursesRoutes';

function App() {
  const theme = useTheme();
  return (
      <main>
      <div className="App" style={{backgroundColor: theme.palette.background.default}}>
        <BrowserRouter>
            <Routes>
              {/* <Route element={<AuthProvider><Header /> <Sidebar /></AuthProvider>}> */}

              {
                DashboardRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider><Header /> <Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                StudentsRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider><Header /> <Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                TeachersRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider><Header /> <Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                CoursesRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider><Header /> <Sidebar />{route.element}</AuthProvider>} />
                )
              }
            </Routes>
        </BrowserRouter>
      </div>

      </main>
  );
}

export default App;
