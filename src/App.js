import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./FormStyles.css"; // Import custom CSS for styling
import AddPatient from "./AddPatient";
import DeletePatient from "./DeletePatient";
import UpdatePatient from "./UpdatePatient";
import UpdatePatientEmail from "./UpdatePatientEmail";
import CheckAppointments from "./CheckAppointments";
import UploadFile from "./UploadFile";
import Login from "./Login";
import PatientList from "./PatientList";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isHomePage = location.pathname === "/";

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="app-container">
      {isHomePage && (
        <div>
          {/* Welcome message */}
          <header className="header">
            <h1 className="app-title">Welcome to the Universal Health Hub</h1>
          </header>

          {/* Buttons for different actions */}
          <nav className="nav-links">
            <Link className="nav-link" to="/add">
              Add Patient
            </Link>
            <Link className="nav-link" to="/delete">
              Delete Patient
            </Link>
            <Link className="nav-link" to="/update-email">
              Update Patient
            </Link>
            <Link className="nav-link" to="/check-appointments">
              Check Appointments
            </Link>
            <Link className="nav-link" to="/upload">
              Account Uploader
            </Link>
            <Link className="nav-link" to="/pages">
              Patient List
            </Link>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      <Routes>
        <Route path="/add" element={<AddPatient />} />
        <Route path="/delete" element={<DeletePatient />} />
        <Route path="/update-email" element={<UpdatePatientEmail />} />
        <Route path="/update/:email" element={<UpdatePatient />} />
        <Route path="/check-appointments" element={<CheckAppointments />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pages" element={<PatientList />} />
        <Route
          path="/"
          element={
            <div>
              <h2></h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
