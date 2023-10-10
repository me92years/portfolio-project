import { styled } from '@stitches/react';
import iconLoading from '../../assets/icon-loading.svg';
import styles from './Loading.module.css';

export const Loading = ({ size }: { size: string }) => {
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

export const InlineLoading = ({ size }: { size: string }) => {
  return (
    <img
      className={styles.loading}
      src={iconLoading}
      style={{
        width: size,
        height: size
      }}
    />
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