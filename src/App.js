import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./Context/AuthContext";
import Sidebar from "./Scenes/Global/SideBar";
import Topbar from "./Scenes/Global/TopBar";
import Dashboard from "./Scenes/Dashboard";
import { Route, Routes } from 'react-router-dom'
import UserManagement from "./Scenes/UserManagement/UserManagement";
import AdminLogin from "./Scenes/Signin/Signin";




function App() {


  const [theme, colorMode] = useMode()
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {token ? (<div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/user-management" element={<UserManagement/>}/>
            </Routes>
          </main>
        </div> ) : (<div className='content'>
        <Routes>
            <Route path='/' element={<AdminLogin/>}  />
        </Routes>
    </div>)}
    </AuthProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
