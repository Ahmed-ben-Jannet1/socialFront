import React, { Suspense, Fragment, useEffect } from "react";
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
import PrivateRoutes from "./components/routing/PrivateRoutes";
import Spinner from "./components/layout/Spinner";

const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const CreateProfile = React.lazy(() =>
  import("./components/profile-form/CreateProfile")
);
const AddExperience = React.lazy(() =>
  import("./components/profile-form/AddExperience")
);
const AddEducation = React.lazy(() =>
  import("./components/profile-form/AddEducation")
);
const Profiles = React.lazy(() => import("./components/profiles/Profiles"));
const Posts = React.lazy(() => import("./components/posts/Posts"));
const Profile = React.lazy(() => import("./components/profile/Profile"));
const Post = React.lazy(() => import("./components/post/Post"));
const EditProfile = React.lazy(() =>
  import("./components/profile-form/EditProfile")
);

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
          const res = await axios.get(`${process.env.REACT_APP_BACK}/api/auth`);

          return dispatch(authActions.USER_LOADED(res.data));
        }
      } catch (error) {
        dispatch(authActions.LOGOUT_OR_FAIL());
      }
    }
    gettingUser();
  }, [isAuthenticated, dispatch]);

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <Suspense
        fallback={
          <section className="container">
            <Spinner />
          </section>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />

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
          <Route
            path="/posts"
            element={
              <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
                <Posts />
              </PrivateRoutes>
            }
          />

          <Route
            path="/posts/:id"
            element={
              <PrivateRoutes isLoggedIn={isAuthenticated && !loading}>
                <Post />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
