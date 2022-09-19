import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/loginContext";
import "../Login.css";

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (login?.login) login?.login(email, password);
  };

  useEffect(() => {
    if (login?.finished && login?.success && !login?.loading && !login?.error)
      navigate("/");
  }, [login]);

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
