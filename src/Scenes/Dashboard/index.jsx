import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import EngineeringIcon from '@mui/icons-material/Engineering';
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StatBox from "../../Conponents/StatBox";
import axios from "../../axios"
import { useEffect, useState } from "react";







const Dashboard = () => { 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({})
  const fetchData = () => {
    axios.get('dashboard-view/').then((res) => {
      setData(res.data)
    })
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.seeker_count}
            subtitle="Total Job Seekers"
            progress="0.75"
            increase="+14%"
            icon={
              <EngineeringIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.recuiter_count}
            subtitle="Total Recruiters"
            progress="0.50"
            increase="+21%"
            icon={
              <BusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.subsciption_count}
            subtitle="Total Subscriptions"
            progress="0.30"
            increase="+5%"
            icon={
              <ShoppingBasketIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >   
          <StatBox
            title={data?.job_count}
            subtitle="Total Jobs"
            progress="0.80"
            increase="+43%"
            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={` $ ${data?.total_earnings}`}
            subtitle="Total Earnings"
            progress="0.75"
            increase="+14%"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
