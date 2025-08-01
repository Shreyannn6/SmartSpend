import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/slices/users/userSlices";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userAuthorisation,
    userApplicationError,
    userSystemError,
    userLoading,
    auth,
  } = useSelector((state) => state.userLogin);
  console.log("User Authorisation : ", userAuthorisation);
  console.log("User Application : ", userApplicationError);
  console.log("User System : ", userSystemError);
  console.log("User Loading : ", userLoading);
  console.log("Auth : ", auth);

  const formValidation = Yup.object().shape({
    creds: Yup.string().required(
      "You have not entered any email or phone number"
    ),
    password: Yup.string().required("You have not entered any password"),
  });
  const formik = useFormik({
    initialValues: {
      creds: "",
      password: "",
    },
    validationSchema: formValidation,
    onSubmit: (values) => {
      dispatch(
        loginUserAction({ userCreds: values.creds, password: values.password })
      ); // <- Dispatching login action
    },
  });

useEffect(() => {
  if (userAuthorisation && typeof userAuthorisation === "object") {
    const timer = setTimeout(() => {
      navigate("/profile", { replace: true }); // <- prevents going back
    }, 500);
    return () => clearTimeout(timer);
  }
}, [userAuthorisation, navigate]);


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* Left Side - Heading */}
      <div className="w-50 text-center me-5">
        <h1 className="fs-3 fw-bold">
          Take control of your finances with this website—manage your money
          wisely and spend smarter.
        </h1>
      </div>

      {/* Right Side - Input Form */}
      <div
        className="w-50 py-4 px-5 rounded shadow"
        style={{ backgroundColor: "#EAEAEA", height: "fit-content" }}
      >
        <h3 className="fw-bold text-dark">Sign In</h3>

        <form onSubmit={formik.handleSubmit}>
          {/* Email or Phone Number Field */}
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              name="creds"
              value={formik.values.creds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your registered number or email"
              aria-label="Username"
            />
          </div>
          {formik.touched.creds && formik.errors.creds && (
            <div
              className="alert alert-danger p-2"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#721c24",
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
              }}
            >
              {formik.errors.creds}
            </div>
          )}
          {/* Password Field */}
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              aria-label="Password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div
              className="alert alert-danger p-2"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#721c24",
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
              }}
            >
              {formik.errors.password}
            </div>
          )}


          {/* ✅ Error or Status Message */}
          {(userAuthorisation || userApplicationError || userSystemError) && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                fontWeight: "500",
                fontSize: "14px",
                color:
                  typeof userAuthorisation === "object" ? "#155724" : "#721c24",
                backgroundColor:
                  (typeof userAuthorisation === "object" &&
                    userAuthorisation?.message
                      ?.toLowerCase()
                      .includes("success")) ||
                  (typeof userAuthorisation === "string" &&
                    userAuthorisation?.toLowerCase().includes("success"))
                    ? "#d4edda"
                    : "#f8d7da",
                border:
                  (typeof userAuthorisation === "object" &&
                    userAuthorisation?.message
                      ?.toLowerCase()
                      .includes("success")) ||
                  (typeof userAuthorisation === "string" &&
                    userAuthorisation?.toLowerCase().includes("success"))
                    ? "1px solid #c3e6cb"
                    : "1px solid #f5c6cb",
              }}
            >
              {typeof userAuthorisation === "object"
                ? userAuthorisation?.message
                : userAuthorisation || userApplicationError || userSystemError}
            </div>
          )}

          {/* Submit Button */}
          {userLoading ? (
            <button type="submit" className="btn btn-outline-primary w-75">
              Loading!! Please wait.....
            </button>
          ) : (
            <button type="submit" className="btn btn-outline-primary w-75">
              Sign In
            </button>
          )}
        </form>

        {/* Forgot Password */}
        <div className="mt-0 text-center">
          <span className="fs-6 text-muted">
            <Link to="/forgot-password" className="fw-bold text-danger">
              Forgot Password?
            </Link>
          </span>
        </div>

        {/* Register Link */}
        <div className="mt-0 text-center">
          <span className="fs-6 text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="fw-bold text-primary">
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
