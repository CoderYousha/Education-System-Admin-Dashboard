import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/colors.css';
import './styles/constants.css';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import NotAuthProvider from './providers/NotAuthProvider';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import DashboardRoutes from './routes/DashboardRoutes';

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
            </Routes>
        </BrowserRouter>
      </div>

      </main>
  );
}

export default App;
