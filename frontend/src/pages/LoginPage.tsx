import { useNavigate } from "react-router-dom";
import { useLoginEvents } from "../hooks/useLoginEvents";

import LoginHome from "../components/main/login/LoginHome";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLoginState } from "../features/login/loginSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginRequest = useAppSelector(selectLoginState);
  const loginEvents = useLoginEvents({ navigate, dispatch, loginRequest });

  return (
    <>
      <LoginHome
        loginEvents={loginEvents}
        loginRequest={loginRequest}
      />
    </>
  );
};

export default LoginPage;