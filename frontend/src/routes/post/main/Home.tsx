import { UserPrincipal } from '../../../app/types';
import Posts from '../article/Home_Posts';
import styles from './Home.module.css';

const Home = ({ userPrincipal }: { userPrincipal: UserPrincipal }) => {

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Posts userPrincipal={userPrincipal} />
      </section>
    </main>
  );
};

export default Home;