import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MediaDBHeader from "./components/MediaDBHeader";
import MediaDBHome from "./components/MediaDBHome";
import { useEffect } from "react";
import { useLazyAuthQuery, useLazyLogoutQuery } from "../app/api";
import { Loading } from "./components/Loading";

function MediaDBRoutes() {
  const navigate = useNavigate();
  const [getAuth, { data: authInfo, isLoading: isAuthLoading }] = useLazyAuthQuery();
  const [getLogout, { isLoading: isLogoutLoading }] = useLazyLogoutQuery();


  const headerEvents = {
    onClickLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      navigate('/login');
    },
    onClickLogout: async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      await getLogout();
      location.reload();
    }
  };

  const mainEvents = {

  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <Routes>
      <Route path='/' element={
        <>
          {isLogoutLoading ? <Loading size={'30%'} /> : <></>}
          <MediaDBHeader
            authInfo={authInfo}
            isAuthLoading={isAuthLoading}
            events={headerEvents}
          />
          <Outlet context={{
            events: mainEvents
          }}
          />
        </>
      }>
        <Route index={true} element={<MediaDBHome />} />
      </Route>
      // 끝
    </Routes>
  )
}

export default MediaDBRoutes;