import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/colors.css';
import './styles/constants.css';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import { useTheme } from '@mui/material/styles';
import DashboardRoutes from './routes/DashboardRoutes';
import StudentsRoutes from './routes/StudentsRoutes';
import TeachersRoutes from './routes/TeachersRoutes';

function App() {
  const theme = useTheme();
  return (
      <main>
      <div className="App" style={{backgroundColor: theme.palette.background.default}}>
        <BrowserRouter>
            <Routes>
              {
                DashboardRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider>{route.element}</AuthProvider>} />
                )
              }
              {
                StudentsRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider>{route.element}</AuthProvider>} />
                )
              }
              {
                TeachersRoutes().map((route, index) => 
                  <Route key={index} path={route.path} element={<AuthProvider>{route.element}</AuthProvider>} />
                )
              }
            </Routes>
        </BrowserRouter>
      </div>

      </main>
  );
}

export default App;
