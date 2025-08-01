// store.js or Store.jsx
import { configureStore } from "@reduxjs/toolkit";
import  { userLoginReducer,userRegisterReducer } from "../slices/users/userSlices"; // Adjust path accordingly


const store = configureStore({
  reducer: {
    userLogin: userLoginReducer, // This 'user' key will be used in useSelector
    userRegister: userRegisterReducer, // This 'user' key will be used in useSelector
  },
});

export default store;
