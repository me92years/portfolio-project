import { Route, Routes } from 'react-router-dom';
import { styled } from '@stitches/react'
import PortfolioPage from './pages/PortfolioPage';
import MediadbPage from './pages/MediadbPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<PortfolioPage />} />
        <Route path='/mediadb/*' element={<MediadbPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Container>
  );
};

const Container = styled('div', {
  width: '100%',
  height: 'auto',
});

export default App
