import { AuthEvents } from "../../hooks/useAuthEvents";
import { MediadbHeaderEvents } from "../../hooks/useMediadbHeaderEvents";
import { HeaderWrap, Logo, Nav, NavButton, NavLi, NavUl } from "../common/HeaderObject";
import { InlineLoading } from "../common/Loading";
import styles from './MediadbHeader.module.css'

const MediadbHeader = (
  { authEvents, headerEvents }:
    {
      authEvents: AuthEvents,
      headerEvents: MediadbHeaderEvents
    }) => {
  const { events } = headerEvents;
  const { status } = authEvents;

  return (
    <HeaderWrap className={styles.headerWrap}>
      <Nav>
        <NavUl>
          <NavLi>
            <Logo className={styles.logo}>
              <NavButton
              >
                MEDIA DATABASE
              </NavButton>
            </Logo>
          </NavLi>
          <NavLi>
            <NavButton
              className={styles.back}
              onClick={events.clickToBack}
            >
              <small>돌아가기</small>
            </NavButton>
          </NavLi>
        </NavUl>
        <NavUl>
          <NavLi>
            <NavButton
              className={styles.navButton}
            >
              영화
            </NavButton>
          </NavLi>
          <NavLi>
            <NavButton
              className={styles.navButton}
            >
              TV 프로그램
            </NavButton>
          </NavLi>
          <NavLi>
            <NavButton
              className={styles.navButton}
            >
              인물
            </NavButton>
          </NavLi>
        </NavUl>
        <NavUl>
          <NavLi>
            {
              !status.authLoading
                ? !status.authData.email
                  ? (
                    <NavButton
                      className={styles.navButton}
                      onClick={events.login}
                    >
                      로그인
                    </NavButton>
                  )
                  : (
                    <NavButton
                      className={styles.navButton}
                      onClick={events.logout}
                    >
                      로그아웃
                    </NavButton>
                  )
                : (<InlineLoading />)
            }
          </NavLi>
        </NavUl>
      </Nav>
    </HeaderWrap>
  );
};

export default MediadbHeader;