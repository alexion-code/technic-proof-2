import { useLogin } from "../contexts/loginContext";
import RedirectToHome from "./RedirectToHome";

const PrivateRoute = (props: any) => {
  const login = useLogin();
  return login?.success && !login?.loading && login?.finished ? (
    props?.children
  ) : (
    <RedirectToHome />
  );
};

export default PrivateRoute;
