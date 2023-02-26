import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Tune } from "@mui/icons-material";
import { Button } from '@mui/material';





function JobManagement() {
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")) : null

  const [jobs, setJobs] = useState([])
  const fetchJobs = async () => {
    axios.get('all-jobs/', {
      headers : {
        Authorization : `Bearer ${token.access}`
      }
    }).then((res) => {
      setJobs(res.data)
    })
  }

  const [isBlocked, setIsBlocked] = useState(false)
  const blockUnBlock = (id) => {
    axios.post(`job-block-unblock-view/?job_id=${id}`, {
        headers : {
          Authorization : `Bearer ${token.access}`
        }
      }).then((res) => {
      console.log(res.data);
      setIsBlocked(!isBlocked)
    })
  }

  useEffect(() => {
    fetchJobs()
  }, [isBlocked])
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "job_title",
      headerName: "Job Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "company_id",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter : (tableData) => tableData.row.company_id.company_name,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter : (tableData) => tableData.row.category.category_name,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter : (tableData) => tableData.row.department.department_name,
    },
    {
      field: "job_type",
      headerName: "Job Type",
      flex: 1,
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
      renderCell: (params) => {
        return(
          <Box>
            {params.row.is_active ? (<Button
            sx={{backgroundColor: colors.blueAccent[700]}}
          variant="contained"
          onClick={()=> blockUnBlock(params.row.id)}
        >
          Block
        </Button>) : (<Button
          variant="contained"
          onClick={()=> blockUnBlock(params.row.id)}
        >
          Unblock
        </Button>)}
          </Box>
        )
      },
    },
  ];

  
  return (
    <Box m="20px">
      <Header title="JOBS" subtitle="Managing JOBS" />
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
        <DataGrid checkboxSelection rows={jobs} columns={columns} />
      </Box>
    </Box>
  );
};


export default JobManagement