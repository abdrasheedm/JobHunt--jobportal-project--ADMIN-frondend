import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState("");

  let [token] = useState(() =>
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
    if (!token) {
      return;
    }
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
