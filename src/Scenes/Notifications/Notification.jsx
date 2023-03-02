import { useTheme } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import Header from "../../Conponents/Header";
import BellIcon from "../../assets/notification.png";
import { tokens } from "../../theme";
import { Typography } from "@mui/material";
import axios from "../../axios";
import { useState } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Notification() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {setIsUnread, IsUnread} = useContext(AuthContext)

  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = () => {
    axios.get("admin-notifications/").then((res) => {
      setNotifications(res.data);
      console.log(res.data);
    });
  };

  const seenNotifications = () => {
    axios.patch('admin-notifications-seen-view/').then((res) => {
      console.log(res.data);
      setIsUnread(!IsUnread)
    })
  }
const navigate = useNavigate()
  const showDateTime = (dateandtime) => {
    const datetime = new Date(dateandtime);
    const date = datetime.toLocaleDateString();
    const time = datetime.toLocaleTimeString();

    return(
      <div>
        <div>{date}</div> &nbsp; &nbsp; &nbsp;&nbsp; <div>{time}</div>
      </div>
    )
  };

  useEffect(() => {
    fetchNotifications();
    seenNotifications()
  }, []);

  return (
    <div className="container mx-auto pt-20 px-10">
      <div>
        <Header title="Notifications" />
      </div>
        {notifications.length ? (
          <div>
            {notifications.map((notificaion, index) => {
              return (
                <div className="grid grid-cols-6">

                  <div className="col-span-4" onClick={() => navigate(notificaion.url)}>
                    <div className="shadow-xl p-8 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-opacity-50 bg-white ">
                      <div className="col-span-2">
                        <img
                          src={BellIcon}
                          className="rounded-lg lg:w-20 lg:h-20 h-12 w-12 object-cover"
                          alt="notification Icon"
                        />
                      </div>
                      <div className="col-span-5 pr-5 hover:cursor-pointer">
                        <h1 className="capitalize text-xl font-bold pt-3">
                          <Typography
                            variant="h5"
                            color={colors.primary[400]}
                            fontWeight="bold"
                          >
                            { notificaion.title }
                          </Typography>
                        </h1>
                        <div className="flex pt-3"></div>
                        <div className="py-3">
                          <p className=" text-gray-800">
                            { notificaion.notification }
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col items-center">
                        <div className="my-5">
                          {showDateTime(notificaion.created_at)}
                        </div>
                        <p className="text-center pt-3 italic text-gray-600"></p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            No notifications found
          </div>
        )}
    </div>
  );
}

export default Notification;
