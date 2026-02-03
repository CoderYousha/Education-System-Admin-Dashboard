import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext();

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  const colorMode = useMemo(() => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
        
       localStorage.setItem('theme', mode === "light" ? "dark" : "light");
      },
    }),
    []
  );

  const theme = useMemo( () => createTheme({ 
    palette: { mode, 
      background: { default: mode === "dark" ? "#121212" : "#ffffff", paper: mode === "dark" ? "#1e1e1e" : "#f5f5f5", }, }, typography: { fontFamily: "Cairo, Arial, sans-serif", }, }), [mode] );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
