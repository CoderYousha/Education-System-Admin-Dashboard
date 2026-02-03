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
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const theme = useTheme();
  return (
      <main>
      <div className="App" style={{backgroundColor: theme.palette.background.default}}>
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element={<AuthProvider><Dashboard /></AuthProvider>} />
            </Routes>
        </BrowserRouter>
      </div>

      </main>
  );
}

export default App;
