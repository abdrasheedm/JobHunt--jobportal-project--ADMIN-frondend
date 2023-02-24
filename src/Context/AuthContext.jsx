import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios"




const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {

    const [errorMsg, setErrorMsg] = useState("")

    let [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const navigate = useNavigate()

    console.log('hai');
    const AdminLogin = async (email, password) => {
        await axios.post("user/signin/", {email, password}).then((res) => {
            if (res.data.token) {
                if(res.data.user.user_type==="Admin") {
                    localStorage.setItem("admin", JSON.stringify(res.data))
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    navigate('/dashboard')
                }
                else{
                    setErrorMsg("You are not an Admin")
                }
            }
            else{
                setErrorMsg("Authentication failed")
            }
        }).catch((response) => setErrorMsg("Invalid email or password"))
        
    }

    let logoutAdmin = () => {
        if(!token){
            return
        }
        axios.post('user/logout/', { refresh_token: token?.refresh },
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }).then((res) => {
            localStorage.removeItem("admin")
            localStorage.removeItem("token")
        })
    }


    let contextData = {
        AdminLogin : AdminLogin,
        errorMsg : errorMsg
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}