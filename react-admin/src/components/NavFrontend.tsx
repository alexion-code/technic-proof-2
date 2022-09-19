import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../contexts/loginContext";
import { User } from "../models/user";
import { clearUser } from "../redux/slices/setUserSlice";

const NavFrontend = (props: any) => {
  const login = useLogin();

  const logout = () => {
    if (login?.clear) login?.clear();
    props?.clearUser();
  };

  const menu = props?.user?.userData?.id ? (
    <div className="nav-item text-nowrap" style={{ display: "inline-flex" }}>
      <Link to={"/login"} className="nav-link px-3" onClick={logout}>
        Logout
      </Link>
      <Link to={"/profile"} className="nav-link px-3">
        {props?.user?.userData?.first_name} {props?.user?.userData?.last_name}
      </Link>
    </div>
  ) : (
    <div className="col-md-3 text-end">
      <Link to={"/login"} className="btn btn-outline-primary me-2">
        Login
      </Link>
      <Link to={"/register"} className="btn btn-primary">
        Register
      </Link>
    </div>
  );

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `nav-link px-2 link-secondary ${isActive ? "link-dark" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/users"}
              className={({ isActive }) =>
                `nav-link px-2 link-secondary ${isActive ? "link-dark" : ""}`
              }
            >
              Admin
            </NavLink>
          </li>
        </ul>
        {menu}
      </header>
    </div>
  );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavFrontend);
