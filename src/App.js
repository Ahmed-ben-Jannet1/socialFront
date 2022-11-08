import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";

import axios from "axios";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoutes from "./components/routing/PrivateRoutes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  console.log(isAuthenticated);
  console.log(loading);

  useEffect(() => {
    async function gettingUser() {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get("/api/auth");
        dispatch(authActions.USER_LOADED(res.data));
      } catch (error) {
        dispatch(authActions.LOGOUT_OR_FAIL());
      }
    }
    gettingUser();
  });

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && loading}>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
