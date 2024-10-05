import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./config";

const tableContainerStyle = {
  overflowX: "auto",
  width: "100%",
  maxHeight: "400px",
  marginTop: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
  backgroundColor: "#fff",
};

const theadStyle = {
  backgroundColor: "#f4f4f4",
};

const thStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  color: "#333",
  fontSize: "14px",
  cursor: "pointer", // Indicate that column headers are clickable
};

const tdStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
};

const trEvenStyle = {
  backgroundColor: "#f9f9f9",
};

const trHoverStyle = {
  backgroundColor: "#f1f1f1",
};

const paginationControlsStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  backgroundColor: "#007bff",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const disabledButtonStyle = {
  backgroundColor: "#c0c0c0",
  cursor: "not-allowed",
};

const paginationControlsSpanStyle = {
  fontSize: "14px",
};

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "email",
    direction: "ascending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  const fetchPatients = async (pageNumber) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/patient/pages?page=${pageNumber}&size=10`
      );
      if (response.ok) {
        const data = await response.json();
        setPatients(sortData(data.content)); // Sort data upon fetching
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch patients.");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
    setPatients(sortData(patients, key, direction));
  };

  const sortData = (
    data,
    key = sortConfig.key,
    direction = sortConfig.direction
  ) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <h2>Patient List</h2>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle} onClick={() => handleSort("email")}>
                Email
              </th>
              <th style={thStyle} onClick={() => handleSort("name")}>
                Name
              </th>
              <th style={thStyle} onClick={() => handleSort("location")}>
                Location
              </th>
              <th style={thStyle} onClick={() => handleSort("status")}>
                Status
              </th>
              <th
                style={thStyle}
                onClick={() => handleSort("lastAppointmentDate")}
              >
                Last Appointment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} style={index % 2 === 0 ? trEvenStyle : {}}>
                <td style={tdStyle}>{patient.email}</td>
                <td style={tdStyle}>{patient.name}</td>
                <td style={tdStyle}>{patient.location}</td>
                <td style={tdStyle}>{patient.status}</td>
                <td style={tdStyle}>{patient.lastAppointmentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={paginationControlsStyle}>
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          style={
            page === 0
              ? { ...buttonStyle, ...disabledButtonStyle }
              : buttonStyle
          }
        >
          Previous
        </button>
        <span style={paginationControlsSpanStyle}>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          style={
            page === totalPages - 1
              ? { ...buttonStyle, ...disabledButtonStyle }
              : buttonStyle
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientList;
