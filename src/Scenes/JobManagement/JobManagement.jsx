import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function JobManagement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    axios.get("all-jobs/").then((res) => {
      setJobs(res.data);
    });
  };

  const [isBlocked, setIsBlocked] = useState(false);
  const blockUnBlock = (id) => {
    axios
      .post(`job-block-unblock-view/?job_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setIsBlocked(!isBlocked);
      });
  };

  const [reportedJobs, setReportedJobs] = useState([]);
  const fetchReportedJobs = () => {
    axios.get("reported-jobs/").then((res) => {
      setReportedJobs(res.data);
    });
  };

  useEffect(() => {
    fetchJobs();
  }, [isBlocked]);

  const columns1 = [
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
      valueGetter: (tableData) => tableData.row.company_id.company_name,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter: (tableData) => tableData.row.category.category_name,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (tableData) => tableData.row.department.department_name,
    },
    {
      field: "job_type",
      headerName: "Job Type",
      flex: 1,
    },
    {
      field: "reports",
      headerName: "Reports",
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      valueGetter: (status) => {
        if (status.row.is_active === true) {
          return "Active";
        } else {
          return "inactive";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            {params.row.is_active ? (
              <Button
                sx={{ backgroundColor: colors.blueAccent[700] }}
                variant="contained"
                onClick={() => blockUnBlock(params.row.id)}
              >
                Block
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => blockUnBlock(params.row.id)}
              >
                Unblock
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  const columns2 = [
    { field: "id", headerName: "ID" },
    {
      field: "job_title",
      headerName: "Job Title",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (tableData) => tableData.row.job_id.job_title,
    },
    {
      field: "seeker_id",
      headerName: "Reported By",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter : (tableData) => tableData.row.seeker_id.seeker.first_name,
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {params.row.tags.map((tag)=> {
              return(
                <Box py="2px">
                #&nbsp; &nbsp;{tag}
              </Box>
              )
            })}
          </Box>
        );
      },

    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mr="20px"
      >
        <Header title="JOBS" subtitle="Managing JOBS" />
        <Box>
          {!reportedJobs.length ? (
            <Button
              onClick={() =>fetchReportedJobs()}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <VisibilityIcon sx={{ mr: "10px" }} />
              Reports on Jobs
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
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
        <DataGrid checkboxSelection rows={jobs} columns={columns1} />
      </Box>
      {reportedJobs.length ? (
        <Box mt="40px">
        <Header title="JOBS" subtitle="Reported Jobs" />

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
          <DataGrid checkboxSelection getRowHeight={(params) => params.model.tags.length * 25} rows={reportedJobs} columns={columns2} />
        </Box>
      </Box>
      ) : ''}
    </Box>
  );
}

export default JobManagement;
