import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/users/userSlices";

function Navbar2(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#B6B09F" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-success">New Income</button>
              <button className="btn btn-danger">New Expense</button>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-warning"
              style={{ marginLeft: "auto" }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar2;
