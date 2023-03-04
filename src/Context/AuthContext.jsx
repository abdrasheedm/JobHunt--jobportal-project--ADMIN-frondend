import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { BASEURL } from "../Constants";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(localStorage.getItem('token') ? true : false)

  let [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const navigate = useNavigate();
  const [isUnread, setIsUnread] = useState(false);

  const AdminLogin = async (email, password) => {
    await axios
      .post("user/signin/", { email, password })
      .then((res) => {
        if (res.data.token) {
          if (res.data.user.user_type === "Admin") {
            localStorage.setItem("admin", JSON.stringify(res.data));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/");
            window.location.reload(false)
          } else {
            setErrorMsg("You are not an Admin");
          }
        } else {
          setErrorMsg("Authentication failed");
        }
      })
      .catch((response) => setErrorMsg("Invalid email or password"));
  };

  let logoutAdmin = () => {
    axios
      .post(
        "user/logout/",
        { "refresh_token": token?.refresh },
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        navigate("/signin");
        window.location.reload(false)

      });
  };


  let updateToken = async () => {
   
    let response = await fetch(`${BASEURL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setToken(data);
      localStorage.setItem("token", JSON.stringify(data));
    } else {
      logoutAdmin();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    if (loading) {
      updateToken();
    }

  

  let fourMinute = 1000 * 60 * 4;
  let interval = setInterval(() => {
    if (token) {
      console.log('called');
      updateToken();
    }
  }, fourMinute);
  return () => clearInterval(interval);
}, [token, loading]);



  let contextData = {
    AdminLogin: AdminLogin,
    logoutAdmin: logoutAdmin,
    errorMsg: errorMsg,
    isUnread: isUnread,
    setIsUnread: setIsUnread,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
