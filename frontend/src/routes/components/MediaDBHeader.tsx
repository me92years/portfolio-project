import * as React from 'react';
import { styled } from '@stitches/react';
import { Link } from 'react-router-dom';
import styles from './MediaDBHeader.module.css'

interface MediaDBHeaderProps {

};

const MediaDBHeader = React.forwardRef(
  (_props: MediaDBHeaderProps, ref: React.Ref<HTMLElement>) => {

    return (
      <Header ref={ref}>
        <Nav>
          <Link className={styles.homeLogo} to='/mediadb'>Media Database</Link>
          <Ul>
            <Li className={styles.homeLi} >영화</Li>
            <Li className={styles.homeLi} >TV 프로그램</Li>
            <Li className={styles.homeLi} >인물</Li>
          </Ul>
          <Ul>
            <Li className={styles.homeLi}>
              <Link className={styles.homeLink} to='/login'>로그인</Link>
            </Li>
          </Ul>
        </Nav>
      </Header>
    );
  });

const Header = styled('header', {
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
    marginRight: '1rem'
  }
});

const Li = styled('li', {
  fontSize: '1.4rem',
  fontWeight: 800,
});

export default MediaDBHeader;