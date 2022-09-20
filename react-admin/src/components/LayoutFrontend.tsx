import React, { Dispatch, Suspense, useLayoutEffect } from "react";
import { UserService } from "../models/user";
import { fetchUser } from "../redux/slices/setUserSlice";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/loginContext";
const NavFrontend = React.lazy(() => import("./NavFrontend"));
const Spinner = React.lazy(() => import("./Spinner"));

const LayoutFrontend = (props: {
  user: UserService;
  fetchUser: () => void;
  children: any;
  className?: string;
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
    <div>
      <Suspense fallback={<Spinner />}>
        <NavFrontend />
      </Suspense>

      <main>
        <div
          className={`album py-4 ${props?.className ? props?.className : ""}`}
        >
          <div className="container">{props?.children}</div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: UserService }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutFrontend);
