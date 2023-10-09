import { Route, Routes } from 'react-router-dom';
import { styled } from '@stitches/react'
import PortfolioRoutes from './routes/PortfolioRoutes';
import MediaDBRoutes from './routes/MediaDBRoutes';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/*' element={<PortfolioRoutes />} />
        <Route path='/mediadb/*' element={<MediaDBRoutes />} />
        <Route path='/login' />
      </Routes>
    </Container>
  );
};

const Container = styled('div', {
  width: '100%',
  height: 'auto',
});

export default App
