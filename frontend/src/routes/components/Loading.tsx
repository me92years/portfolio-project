import { styled } from '@stitches/react';
import iconLoading from '../../assets/icon-loading.svg';
import styles from './Loading.module.css';

const Loading = ({ size }: { size: string }) => {
  return (
    <Overlay>
      <img
        className={styles.loading}
        src={iconLoading}
        style={{
          width: size,
          height: size
        }}
      />
    </Overlay>
  );
};

const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#66666666',
  zIndex: 1000,
});

export default Loading;