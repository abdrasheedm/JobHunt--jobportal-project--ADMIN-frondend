import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../Data]/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Tune } from "@mui/icons-material";
import { Button } from '@mui/material';





function UserManagement() {
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")) : null

  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    axios.get('all-user/', {
      headers : {
        Authorization : `Bearer ${token.access}`
      }
    }).then((res) => {
      console.log(res.data);
      setUsers(res.data)
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "user_type",
      headerName: "User Type",
      flex: 1,
      valueGetter : (tableData) => tableData.row.user_type.user_type_name,
      // renderCell: ({ row: { UserType } }) => {
      //   console.log(UserType);
      //   return (
      //     <Box
      //       width="60%"
      //       m="0 auto"
      //       p="5px"
      //       display="flex"
      //       justifyContent="center"
      //       backgroundColor={
      //         UserType === "Admin"
      //           ? colors.greenAccent[600]
      //           : UserType === "Recruiter"
      //           ? colors.greenAccent[700]
      //           : colors.greenAccent[700]
      //       }
      //       borderRadius="4px"
      //     >
      //       {UserType === "Admin" && <AdminPanelSettingsOutlinedIcon />}
      //       {UserType === "Recruiter" && <SecurityOutlinedIcon />}
      //       {UserType === "JobSeeker" && <LockOpenOutlinedIcon />}
      //       <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
      //         {UserType}
      //       </Typography>
      //     </Box>
      //   );
      // },
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      valueGetter : (status) => {
        // console.log(status);
        if(status.row.is_active == true){
          return 'Active'
        }else{
          return 'inactive'
        }
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        console.log(params.row.is_active),
        <Button
          variant="contained"
          color="primary"
          // onClick={() => handleUnblock(params.id)}
        >
          Unblock
        </Button>
      ),
    },
  ];

  
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={users} columns={columns} />
      </Box>
    </Box>
  );
};


export default UserManagement