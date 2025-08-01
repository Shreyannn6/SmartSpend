import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import Signin_page from "./pages/users/Sign-in_page";
// import Signup_page from '../src/pages/users/Signup_page'
import Login_Register from "./pages/users/Login_Register";
import Profile from "./pages/users/Profile";

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Login_Register />} />
            <Route path="/register" element={<Login_Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
