import { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './routes/login/Login';
import Home from './routes/post/main/Home';
import Header from './routes/post/header/Header';
import Detail from './routes/post/main/Detail';
import api from './app/api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUserPrincipal } from './app/slice';

function App() {
  const dispatch = useAppDispatch();
  const [getUserPrincipal, { isLoading: isGetUserPrincipalLoading }] = api.useLazyGetUserPrincipalQuery();
  const userPrincipal = useAppSelector(state => state.slice.userPrincipal);

  useEffect(() => {
    const setup = async () => {
      const response = await getUserPrincipal().unwrap();
      dispatch(setUserPrincipal(response));
    }
    setup();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={(
          <>
            <Header
              userPrincipal={userPrincipal}
              isGetUserPrincipalLoading={isGetUserPrincipalLoading}
            />
            <Outlet />
          </>
        )}
      >
        <Route
          index={true}
          element={<Home 
            userPrincipal={userPrincipal}
          />}
        />
        <Route
          path='/post/get/:pid'
          element={<Detail
            userPrincipal={userPrincipal}
          />}
        />
      </Route>
      <Route
        path='/login'
        element={<Login />}
      />
    </Routes>
  );
};

export default App
