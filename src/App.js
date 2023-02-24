import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/TopBar";
import Sidebar from "./Scenes/Global/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Scenes/Dashboard/index";
import RecruiterManagement from "./Scenes/RecruiterMangement/RecruiterManagement";


function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recruiter-management" element={<RecruiterManagement />} />
          </Routes>
        </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
