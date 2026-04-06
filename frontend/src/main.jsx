import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./createUser/createUser";
import "./index.css";
import RecordManage from "./recordManagement/RecordManage";
import ShowRecord from "./records/ShowRecord";
import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import Dashboard from "./dashboard/Dashboard";
import NotFound from "./NotFound";
import Login from "./login/Login";
import ContextApi from "./ContextApi";
import ProtectedRoute from "./ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextApi>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/create-user"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-record"
            element={
              <ProtectedRoute>
                <RecordManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoute>
                <ShowRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </ContextApi>
  </StrictMode>,
);
