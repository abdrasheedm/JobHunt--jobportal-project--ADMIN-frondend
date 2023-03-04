import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./Context/AuthContext";
import Sidebar from "./Scenes/Global/SideBar";
import Topbar from "./Scenes/Global/TopBar";
import Dashboard from "./Scenes/Dashboard";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./Scenes/UserManagement/UserManagement";
import AdminLogin from "./Scenes/Signin/Signin";
import JobManagement from "./Scenes/JobManagement/JobManagement";
import CategoryManagement from "./Scenes/CategoryMangement/CategoryManagement";
import DepartmentManagement from "./Scenes/DepartmentManagement/DepartmentManagement";
import Notification from "./Scenes/Notifications/Notification";
import QualificationManagement from "./Scenes/QualificationManagement/QualificationManagement";
import Subsciptions from "./Scenes/Subscriptions/Subscriptions";
import AdminPrivateRoute from "./Routes/AuthorisedRoutes";
import NotFoundPage from "./Scenes/404/PageNotFound";

function App() {
  const [theme, colorMode] = useMode();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
  
            <div className="app">
              <Sidebar />
              <main className="content">
                <Routes>
                <Route path="/signin" element={<AdminLogin />} />
                {/* <Route path="/*" element={<NotFoundPage />} /> */}
                </Routes>
                <Topbar />

                <Routes>
                  <Route element={<AdminPrivateRoute />}>

                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/user-management"
                      element={<UserManagement />}
                    />
                    <Route path="/job-management" element={<JobManagement />} />
                    <Route
                      path="/category-management"
                      element={<CategoryManagement />}
                    />
                    <Route
                      path="/department-management"
                      element={<DepartmentManagement />}
                    />
                    <Route path="/notifications" element={<Notification />} />
                    <Route
                      path="/qualification-management"
                      element={<QualificationManagement />}
                    />
                    <Route
                      path="/subscription-details"
                      element={<Subsciptions />}
                    />
                  </Route>
                </Routes>
              </main>
            </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
