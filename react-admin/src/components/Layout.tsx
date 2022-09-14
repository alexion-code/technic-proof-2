import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getUser, useAppDispatch } from "../redux/slices/setUserSlice";
import { fetchUser } from "../redux/slices/setUserSlice";

const Layout = (props: any) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  console.log(props.user);
  useEffect(() => {
    // dispatch(fetchUser());
    props?.fetchUser();
    // props?.getUser();
    // (async () => {
    // try {
    //   const { data } = await axios.get("user");
    //   setUserInfo(data);
    //   dispatch(setUser(data));
    // } catch (e) {
    //   setRedirect(true);
    // }
    // })();
  }, []);

  useEffect(() => {
    if (
      !props?.user?.userData?.id &&
      props?.user?.loading === false &&
      props?.user?.error === false
    )
      setRedirect(true);
  }, [props?.user]);

  useEffect(() => {
    if (redirect) navigate("/login");
  }, [redirect]);

  return (
    <div className="layout">
      <Nav user={props?.user} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

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

const mapStateToProps = (state: { user: { user: User } }) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // getUser: (payload: any) => dispatch(getUser(payload)),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
