import { Route, Routes } from 'react-router-dom';
import { styled } from '@stitches/react'
import PortfolioRoutes from './routes/PortfolioRoutes';
import MediaDBRoutes from './routes/MediaDBRoutes';
import Login from './routes/components/Login';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/*' element={<PortfolioRoutes />} />
        <Route path='/mediadb/*' element={<MediaDBRoutes />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Container>
  );
};

const Container = styled('div', {
  width: '100%',
  height: 'auto',
});

export default App
