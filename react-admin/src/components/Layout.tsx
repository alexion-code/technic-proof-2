import React, { Dispatch, Suspense, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../models/user";
import { connect } from "react-redux";
import { fetchUser } from "../redux/slices/setUserSlice";
import { useLogin } from "../contexts/loginContext";
const Sidebar = React.lazy(() => import("./Sidebar"));
const Nav = React.lazy(() => import("./Nav"));
const Spinner = React.lazy(() => import("./Spinner"));

const Layout = (props: {
  user: UserService;
  fetchUser: () => void;
  children: any;
}) => {
  const navigate = useNavigate();
  const login = useLogin();

  useLayoutEffect(() => {
    if (login?.finished && login?.success && !login?.loading && !login?.error)
      props?.fetchUser();
  }, []);

  useLayoutEffect(() => {
    if (
      (!props?.user?.userData?.id &&
        props?.user?.loading === false &&
        props?.user?.finished === true) ||
      (!props?.user?.userData?.id &&
        props?.user?.loading === false &&
        props?.user?.error === true &&
        props?.user?.finished === true)
    )
      navigate("/login");
  }, [props?.user]);

  return (
    <div className="layout">
      <Suspense fallback={<Spinner />}>
        <Nav />
      </Suspense>
      <div className="container-fluid">
        <div className="row">
          <Suspense fallback={<Spinner />}>
            <Sidebar />
          </Suspense>
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ height: "calc(100%-48px)" }}
          >
            <div className="table-responsive">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: UserService }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
