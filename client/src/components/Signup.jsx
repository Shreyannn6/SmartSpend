import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../redux/slices/users/userSlices";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formValidation = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First name should contain only alphabets")
      .min(2, "First name must be at least 2 characters long")
      .max(50, "First name must not exceed 50 characters")
      .required("Please enter your first name"),

    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last name should contain only alphabets")
      .min(2, "Last name must be at least 2 characters long")
      .max(50, "Last name must not exceed 50 characters")
      .required("Please enter your last name"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),

    mobile: Yup.string()
      .matches(/^\d{10}$/, "mobile number must be exactly 10 digits")
      .required("Please enter your mobile number"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please enter a password"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidation,
    onSubmit: (values) => {
      dispatch(
        registerUserAction({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        })
      ); // <- Dispatching registration action
    },
  });

  const {
    userAuthorisation,
    userApplicationError,
    userSystemError,
    userLoading,
    auth,
  } = useSelector((state) => state.userRegister);
  console.log("User Authorisation : ", userAuthorisation);
  console.log("User Application : ", userApplicationError);
  console.log("User System : ", userSystemError);
  console.log("User Loading : ", userLoading);
  console.log("Auth : ", auth);

  useEffect(() => {
    if (userAuthorisation?.toLowerCase().includes("successful")) {
      const timer = setTimeout(() => {
        navigate("/profile", { replace: true }); // <- prevents going back
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userAuthorisation, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* Left Side - Heading */}
      <div className="w-50 text-center me-5">
        <h1 className="fs-4 fw-bold">
          New User? Register yourself and use our website to manage your
          finances.
        </h1>
      </div>

      {/* Right Side - Input Form */}
      <div
        className="w-50 p-4 rounded shadow"
        style={{
          backgroundColor: "#EAEAEA",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {/* First Name Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Enter Firstname :
            </label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Enter First Name..."
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div
                className="alert alert-danger p-2 mt-2"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#721c24",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                }}
              >
                {formik.errors.firstName}
              </div>
            )}
          </div>

          {/* Last Name Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Enter Lastname :
            </label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Enter Last Name..."
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div
                className="alert alert-danger p-2 mt-2"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#721c24",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                }}
              >
                {formik.errors.lastName}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Enter e-mail :
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Enter your email..."
            />
            {formik.touched.email && formik.errors.email && (
              <div
                className="alert alert-danger p-2 mt-2"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#721c24",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                }}
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* mobile Number Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Enter mobile number :
            </label>
            <input
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Enter your mobile number..."
            />
            {formik.touched.mobile && formik.errors.mobile && (
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
                {formik.errors.mobile}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Enter password :
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Enter your password..."
            />
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
          </div>

          {/* Confirm Password Field */}
          <div className="mb-2">
            <label
              className="form-label"
              style={{
                color: "#000",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
              }}
            >
              Confirm password :
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="Confirm password..."
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
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
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

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
                color: userAuthorisation?.toLowerCase().includes("successful")
                  ? "#155724"
                  : "#721c24",
                backgroundColor: userAuthorisation
                  ?.toLowerCase()
                  .includes("successful")
                  ? "#d4edda"
                  : "#f8d7da",
                border: userAuthorisation?.toLowerCase().includes("successful")
                  ? "1px solid #c3e6cb"
                  : "1px solid #f5c6cb",
              }}
            >
              {userAuthorisation || userApplicationError || userSystemError}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-outline-primary w-75 mt-2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

// Sample Label
// <label
// className="form-label"
// style={{
//   color: "#000",
//   fontSize: "20px",
//   textAlign: "left",
//   display: "block",
// }}
// >
// Confirm password :
// </label>

// Sample Error message
// {formik.touched.mobile && formik.errors.mobile && (
//   <div
//     className="alert alert-danger p-2"
//     style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       color: "#721c24",
//       backgroundColor: "#f8d7da",
//       border: "1px solid #f5c6cb",
//     }}
//   >
//     {formik.errors.mobile}
//   </div>
// )}
