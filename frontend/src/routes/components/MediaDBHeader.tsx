import * as React from 'react';
import { styled } from '@stitches/react';
import { Link } from 'react-router-dom';
import { UserState } from '../../app/states';
import styles from './MediaDBHeader.module.css'
import { InlineLoading } from './Loading';

interface MediaDBHeaderProps {
  authInfo: UserState | undefined,
  isAuthLoading: boolean,
  events: {
    onClickLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClickLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
};

const MediaDBHeader = React.forwardRef(
  ({ authInfo, isAuthLoading, events }: MediaDBHeaderProps, ref: React.Ref<HTMLElement>) => {

    return (
      <Header ref={ref}>
        <Nav>
          <Link
            className={styles.homeLogo}
            to='/mediadb'
          >
            Media Database
          </Link>
          <Ul>
            <Li className={styles.homeLi} >영화</Li>
            <Li className={styles.homeLi} >TV 프로그램</Li>
            <Li className={styles.homeLi} >인물</Li>
          </Ul>
          <Ul>
            <Li className={styles.homeLi}>
              <Link className={styles.homeLink} to='/'>이전으로</Link>
            </Li>
            <Li className={styles.homeLi}>
              {
                isAuthLoading
                  ? <InlineLoading size={'100%'} />
                  : authInfo
                    ? (
                        <Button
                          className={styles.homeButton}
                          onClick={events.onClickLogout}
                        >
                          로그아웃
                        </Button>
                      )
                    : (
                        <Button
                          className={styles.homeButton}
                          onClick={events.onClickLogin}
                        >
                          로그인
                        </Button>
                      )
              }
            </Li>
          </Ul>
        </Nav>
      </Header>
    );
  });

const Header = styled('header', {
  position: 'relative',
  width: '100%',
  minWidth: '1440px',
  height: '5rem',
  zIndex: 100,
});

const Nav = styled('nav', {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Ul = styled('ul', {
  display: 'flex',
  listStyle: 'none',
  columnGap: '1rem',
  '&:last-of-type': {
    marginRight: '2rem'
  }
});

const Li = styled('li', {
  fontSize: '1.4rem',
  fontWeight: 800,
});

const Button = styled('button', {
  border: 'none',
  fontSize: '1.4rem',
  fontWeight: 800,
  background: 'none',
})

export default MediaDBHeader;