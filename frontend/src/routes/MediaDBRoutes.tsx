import { Outlet, Route, Routes } from "react-router-dom";
import MediaDBHeader from "./components/MediaDBHeader";
import MediaDBHome from "./components/MediaDBHome";

function MediaDBRoutes() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <MediaDBHeader />
          <Outlet />
        </>
      }>
        <Route index={true} element={<MediaDBHome />} />
      </Route>
      // 끝
    </Routes>
  )
}

export default MediaDBRoutes;