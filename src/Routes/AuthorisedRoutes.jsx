import { Navigate, Outlet } from "react-router-dom";

 const AdminPrivateRoute = () => {

    let token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : null

    return token ? <Outlet /> : <Navigate to="/signin" />
 }

 export default AdminPrivateRoute;