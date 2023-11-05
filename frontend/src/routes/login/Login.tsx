import styles from './Login.module.css';

const Index = () => {

  return (
    <div className={styles.container}>
      <h1>로그인 페이지</h1>
      <div>
        <a href='/api/oauth2/authorization/google'>구글로 로그인</a>
      </div>
    </div>
  );
};

export default Index;