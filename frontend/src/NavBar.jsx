import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextApi";

function NavBar() {
  const { userRole } = useContext(Context);

  return (
    <div className="Navbar">
      <ul>
        <li style={{ color: "white", marginRight: "700px" }}>{userRole}</li>
        {(userRole === "viewer" ||
          userRole === "analyst" ||
          userRole === "admin") && (
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>Dashboard</li>
          </Link>
        )}
        {(userRole === "analyst" || userRole === "admin") && (
          <Link to="/records" style={{ textDecoration: "none" }}>
            <li>Records</li>
          </Link>
        )}

        {userRole === "admin" && (
          <>
            <Link to="/create-record" style={{ textDecoration: "none" }}>
              <li>Create record</li>
            </Link>
            <Link to="/create-user" style={{ textDecoration: "none" }}>
              <li>Create user</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
