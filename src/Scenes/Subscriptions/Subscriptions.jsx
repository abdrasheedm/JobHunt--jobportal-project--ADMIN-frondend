import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Tune } from "@mui/icons-material";
import { Button } from '@mui/material';





function Subsciptions() {
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")) : null

  const [subscriptions, setSubscriptions] = useState([])
  const fetchSubscriptionDetails = async () => {
    axios.get('subsciption-details/').then((res) => {
      setSubscriptions(res.data)
      console.log(res.data);
    })
  }

  useEffect(() => {
    fetchSubscriptionDetails()
  }, [])
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "user",
      headerName: "Compnay Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter : (tableData) => tableData.row.user.company_name,

    },
    {
      field: "subscription_type",
      headerName: "Subscription Type",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter : (tableData) => tableData.row.membership.user.membership.title,
    },
    {
        field: "price",
        headerName: "Price",
        flex: 1,
        valueGetter : (tableData) => tableData.row.membership.user.membership.price,
      },
    {
      field: "activation_date",
      headerName: "Activation Date",
      flex: 1,
      valueGetter : (tableData) => tableData.row.membership.activation_date,
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 1,
      valueGetter : (tableData) => tableData.row.membership.expiry_date,
    },
    {
      field: "availabe_jobs",
      headerName: "Available Jobs",
      flex: 1,
      valueGetter : (tableData) => tableData.row.membership.user.postable_job_count,

    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      valueGetter : (status) => {
        // console.log(status);
        if(status.row.membership.user.is_active == true){
          return 'Active'
        }else{
          return 'inactive'
        }
      }
    }
  ];

  
  return (
    <Box m="20px">
      <Header title="Subscription Details" subtitle="Analysing subscriptions" />
      <Box
        m="40px 20px 0 20px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={subscriptions} columns={columns} />
      </Box>
    </Box>
  );
};


export default Subsciptions