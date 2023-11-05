import { UserPrincipal, HeadingMouseEvent, ButtonMouseEvent } from '../../../app/types';
import api from '../../../app/api';
import Loading from '../../etc/Loading';
import styles from './Header.module.css';

const Header = ({ userPrincipal, isGetUserPrincipalLoading }: {
  userPrincipal: UserPrincipal,
  isGetUserPrincipalLoading: boolean,
}) => {
  const [getLogout, { isLoading: isGetLogoutLoading }] = api.useLazyGetUserLogoutQuery();

  const login = (e: ButtonMouseEvent) => {
    e.preventDefault();
    location.href = '/login';
  };

  const logout = (e: ButtonMouseEvent) => {
    e.preventDefault();
    const response = getLogout();
    response.then(res => {
      if (res.status === "rejected") {
        alert("에러! 웹 브라우저의 쿠키를 삭제 해 주세요.");
      } else {
        location.href = '/';
        location.reload();
      }
    });
  };

  const home = (e: HeadingMouseEvent) => {
    e.preventDefault();
    location.href = '/';
  };

  let loginOrLogoutButton = (<Loading width={'100%'} />);
  if (!(isGetUserPrincipalLoading || isGetLogoutLoading)) {
    if (userPrincipal) {
      loginOrLogoutButton = (
        <button className={styles.logout} onClick={(e) => logout(e)}>
          로그아웃
        </button>
      )
    } else {
      loginOrLogoutButton = (
        <button className={styles.login} onClick={(e) => login(e)}>
          로그인
        </button>
      )
    }
  }

  return (
    <header className={styles.header}>
      <h1
        className={styles.header_h1}
        onClick={(e) => home(e)}
      >
        PORTFOLIO
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.nav_ul}>
          <li>{loginOrLogoutButton}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;