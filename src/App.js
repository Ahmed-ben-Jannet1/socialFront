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
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    async function gettingUser() {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        if (localStorage.token || isAuthenticated) {
          const res = await axios.get("/api/auth");
          return dispatch(authActions.USER_LOADED(res.data));
        }
      } catch (error) {
        dispatch(authActions.LOGOUT_OR_FAIL());
      }
    }
    gettingUser();
  }, [isAuthenticated]);

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/create-profile"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
              <CreateProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
              <EditProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-experience"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
              <AddExperience />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-education"
          element={
            <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
              <AddEducation />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
