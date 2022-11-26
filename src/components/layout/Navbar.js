import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { profileActions } from "../../store/profile-slice";
const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(authActions.LOGOUT_OR_FAIL());
    dispatch(profileActions.CLEAR_PROFILE());
    navigate("/login");
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutHandler} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <ul>
        <li>
          <Link to="/" style={{ padding: "0" }}>
            <img
              style={{
                width: "2.5rem ",
                height: "2.5rem",
              }}
              src="/./logo192.png"
              alt=""
            />
          </Link>
        </li>
        <li>
          <h1>
            <Link to="/" style={{ padding: "0" }}>
              Posty
            </Link>
          </h1>
        </li>
      </ul>
      {isAuthenticated && !loading && authLinks}
      {!isAuthenticated && !loading && guestLinks}
    </nav>
  );
};

export default Navbar;
