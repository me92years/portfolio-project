import { styled } from "@stitches/react";
import iconLoading from '../../assets/icon_loading.svg';
import styles from './Common.module.css';

export const Loading = () => {
  return (
    <LoadingWrap>
      <img
        style={{
          width: '30%',
        }}
        className={styles.loading}
        src={iconLoading}
      />
    </LoadingWrap>
  );
};

export const InlineLoading = () => {
  return <img
    style={{
      width: '100%',
    }}
    className={styles.loading}
    src={iconLoading}
  />
}

const LoadingWrap = styled('div', {
  zIndex: 1001,
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: '#00000033'
});