import React, { SyntheticEvent, useEffect, useState } from "react";
import "../Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [state, setState] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("register", {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      password: state.password,
      password_confirm: state.passwordConfirm,
    });

    setRedirect(true);
  };

  useEffect(() => {
    if (redirect) return navigate("/login");
  }, [redirect]);
  return (
    <main className="form-register w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            placeholder="first name"
            onChange={(e) =>
              setState((data) => ({ ...data, firstName: e.target.value }))
            }
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
            placeholder="last name"
            onChange={(e) =>
              setState((data) => ({ ...data, lastName: e.target.value }))
            }
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="name@example.com"
            onChange={(e) =>
              setState((data) => ({ ...data, email: e.target.value }))
            }
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setState((data) => ({ ...data, password: e.target.value }))
            }
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Password Confirm"
            onChange={(e) =>
              setState((data) => ({ ...data, passwordConfirm: e.target.value }))
            }
          />
          <label htmlFor="passwordConfirm">Password Confirm</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          register
        </button>
      </form>
    </main>
  );
};

export default Register;
