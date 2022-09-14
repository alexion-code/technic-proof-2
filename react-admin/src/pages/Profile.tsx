import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser, clearUser } from "../redux/slices/setUserSlice";

const Profile = (props: any & { user: User }) => {
  const [first_name, setFirstName] = useState(
    props?.user?.userData?.first_name || ""
  );
  const [last_name, setLastName] = useState(
    props?.user?.userData?.last_name || ""
  );
  const [email, setEmail] = useState(props?.user?.userData?.email || "");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get("user");
  //     setFirstName(data.first_name);
  //     setLastName(data.last_name);
  //     setEmail(data.email);
  //   })();
  // }, []);
  useEffect(() => {
    if (
      props?.user?.userData?.first_name &&
      props?.user?.userData?.last_name &&
      props?.user?.userData?.email
    ) {
      setFirstName(props?.user?.userData?.first_name || "");
      setLastName(props?.user?.userData?.last_name || "");
      setEmail(props?.user?.userData?.email || "");
    }
  }, [props?.user]);

  const submitPersonalInfo = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.put("users/info", {
      first_name,
      last_name,
      email,
    });

    props?.setUser(data);
  };

  const submitPassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      password,
      passwordConfirm,
    };
    await axios.post("users/password", data);
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={submitPersonalInfo}>
        <div className="mb-3">
          <TextField
            value={first_name}
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            value={last_name}
            label="Last Name"
            multiline
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <form onSubmit={submitPassword}>
        <h3 className="mt-4">Change Password</h3>
        <div className="mb-3">
          <TextField
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            value={passwordConfirm}
            label="Password Confirm"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
