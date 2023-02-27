import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import QualificationModal from "../../Conponents/QualificationModal";

function QualificationManagement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  const [qualifications, setQualification] = useState([]);
  const fetchQualification = async () => {
    axios.get("job-qualifications-view/").then((res) => {
      setQualification(res.data);
    });
  };

  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [QId, setQId] = useState();

  const handleOnClose = () => {
    document.body.style.overflow = "unset";
    setIsModal(false);
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const removeQualification = (id) => {
    axios.get(`remove-qualifcation-view/?q_id=${id}`).then((res) => {
      setIsDeleted(!isDeleted);
    });
  };

  useEffect(() => {
    fetchQualification();
  }, [isModal, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Qualification",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              sx={{ backgroundColor: colors.blueAccent[700], marginX: 5 }}
              variant="contained"
              onClick={() => {
                setIsModal(true);
                setModalType("edit");
                setQId(params.row.id);
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ backgroundColor: colors.blueAccent[700] }}
              variant="contained"
              onClick={() => removeQualification(params.row.id)}
            >
              Remove
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Qualifications" subtitle="Managing Qualifications" />
      <div className="flex justify-end mr-10">
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: colors.blueAccent[700],
            justifyContent: "end",
          }}
          onClick={() => {
            setIsModal(true);
            setModalType("add");
          }}
        >
          Add Qualification
        </Button>
      </div>
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
        <DataGrid checkboxSelection rows={qualifications} columns={columns} />
      </Box>
      <QualificationModal
        visible={isModal}
        onClose={handleOnClose}
        Type={modalType}
        QId={QId}
      />
    </Box>
  );
}

export default QualificationManagement;
