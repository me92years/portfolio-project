import { Route, Routes, useNavigate } from "react-router-dom";
import MediadbHeader from "../components/header/MediadbHeader";
import MediadbHome from "../components/main/mediadb/MediadbHome";
import { useMediadbHeaderEvents } from "../hooks/useMediadbHeaderEvents";
import { useAuthEvents } from '../hooks/useAuthEvents';
import { useAppDispatch } from "../app/hooks";

const MediadbPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authEvents = useAuthEvents({ dispatch });
  const headerEvents = useMediadbHeaderEvents({ navigate });

  return (
    <>
      <MediadbHeader
        authEvents={authEvents}
        headerEvents={headerEvents}
      />
      <Routes>
        <Route path='/'>
          <Route
            index={true}
            element={<MediadbHome />}
          />

        </Route>
      </Routes>
    </>
  );
};

export default MediadbPage;