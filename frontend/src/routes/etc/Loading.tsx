import iconLoading from '../../assets/icon_loading.svg';
import styles from './Loading.module.css';

const Loading = ({ width }: { width: string }) => {
  return <img
    className={styles.loading}
    src={iconLoading}
    style={{ width: width }}
  />
}

export default Loading;