import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { WsURL } from "../../Constants";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "../../axios"
import AuthContext from "../../Context/AuthContext";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate()

  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

  const {isUnread} = useContext(AuthContext)
  const {logoutAdmin} = useContext(AuthContext)
  const [unreadNotification, setUnreadNotification] = useState(0)
  const fetchNotificationCount = () => {
    axios.get('notification-count/').then((res) => {
      setUnreadNotification(res.data.count)
    })
  }

 
  
  useEffect(() => {
    if(token){
      const client = new W3CWebSocket(
        `${WsURL}admin/`
      );
      client.onopen = () => {
        console.log("web socket connected")
      };
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        setUnreadNotification(dataFromServer.count)
  
      };
    }
    
  }, [])


  useEffect(() => {
    fetchNotificationCount()
  }, [isUnread])

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml:2, flex:1 }} placeholder="Search" />
        <IconButton type="button" sx={{p:1}}>
            <SearchIcon />
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon />
            ) : (
                <LightModeOutlinedIcon />
            )}

        </IconButton>
        <IconButton  onClick={() => navigate('/notifications')}>
          <Box sx={{position:'relative'}}>
            <Box sx={{position:"absolute", borderRadius:"50%", fontSize:"15px", width:".8rem", left:"1rem"}} color={colors.primary[700]} backgroundColor={colors.greenAccent[400]}>
              <span>
                {unreadNotification}
              </span>
            </Box>
          </Box>

          <NotificationsOutlinedIcon />
            
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
            <PersonOutlinedIcon onClick={() => logoutAdmin()}/>
        </IconButton>
      
        </Box>

      {/* <IconButton></IconButton> */}
    </Box>
  );
};

export default Topbar;
