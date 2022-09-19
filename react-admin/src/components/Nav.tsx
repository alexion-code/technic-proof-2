import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
import { clearUser } from "../redux/slices/setUserSlice";
import { Dispatch } from "react";
import { useLogin } from "../contexts/loginContext";

const Nav = (props: any) => {
  const login = useLogin();

  const logout = () => {
    if (login?.clear) login?.clear();
    props?.clearUser();
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link
        to={"/"}
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
        style={{ width: "206px" }}
      >
        Technic Proof
      </Link>
      <div className="navbar-nav">
        <div
          className="nav-item text-nowrap"
          style={{ display: "inline-flex" }}
        >
          <Link to={"/profile"} className="nav-link px-3">
            {props?.user?.userData?.first_name}{" "}
            {props?.user?.userData?.last_name}
          </Link>
          <Link to={"/login"} className="nav-link px-3" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
