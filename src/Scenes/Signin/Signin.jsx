import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext"

const AdminLogin = () => {


  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const {AdminLogin} = useContext(AuthContext)
  const {errorMsg} =  useContext(AuthContext)



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AdminLogin(email, password)
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
  let token = localStorage.getItem("token") ? localStorage.getItem("token") : null
  if (token){
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Log in to Job Hunt admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border text-gray-900 rounded-lg py-2 px-3 w-full bg-gray-200 outline-none focus:bg-gray-300"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
             {emailError && (
              <p className="text-red-500 text-xs italic mt-2">{emailError}</p>
            )}  
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border text-gray-900 rounded-lg py-2 px-3 w-full bg-gray-200 outline-none focus:bg-gray-300"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {errorMsg && (<p className="text-red-500 text-xs italic mt-2">{errorMsg}</p>)}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Log In
          </button>
          <div className="flex items-center justify-between">

              <div className="text-sm">
                <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
