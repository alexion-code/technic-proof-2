import axios from "axios";
import React, { useContext, createContext } from "react";
import { useMemo, useState } from "react";
import { LoginContextInterface, LoginInterface } from "./loginContext.model";

export const useLogin = () => {
  return useContext(LoginContext);
};

const useLoginProvider = (): LoginContextInterface => {
  const [state, setState] = useState<LoginInterface>({
    error: false,
    loading: false,
    success: false,
    finished: false,
  });

  const login = async (email: string, password: string) => {
    setState({ loading: true, finished: false, error: false, success: false });
    await axios
      .post("login", {
        email,
        password,
      })
      .then((response) => {
        setState((data) => ({
          ...data,
          loading: false,
          success: true,
          finished: true,
        }));
      })
      .catch((error) => {
        setState((data) => ({
          ...data,
          loading: false,
          error: true,
          finished: true,
        }));
      });
  };

  const clear = () => {
    setState({
      loading: false,
      finished: false,
      error: false,
      success: false,
    });
  };

  const loginData = useMemo<LoginContextInterface>(
    () => ({
      success: state.success,
      error: state.error,
      loading: state.loading,
      finished: state.finished,
      login,
      clear,
    }),
    [state]
  );

  return loginData;
};

const LoginContext = createContext<LoginContextInterface>({
  error: undefined,
  loading: undefined,
  success: undefined,
  finished: undefined,
  login: () => null,
  clear: () => null,
});

export const LoginContextProvider = (props: any) => {
  const login: LoginContextInterface = useLoginProvider();
  return (
    <LoginContext.Provider value={login}>
      {props?.children}
    </LoginContext.Provider>
  );
};
