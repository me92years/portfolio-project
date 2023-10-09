import * as React from 'react';
import { styled } from '@stitches/react';
import { Link } from 'react-router-dom';
import styles from './MediaDBHeader.module.css'

interface MediaDBHeaderProps {

};

const MediaDBHeader = React.forwardRef(
  (props: MediaDBHeaderProps, ref: React.Ref<HTMLElement>) => {
    props;
    return (
      <Header ref={ref}>
        <Nav>
          <Logo>
            <Link className={styles.homeLogo} to='/'>Media Database</Link>
          </Logo>
          <Ul>
            <Li className={styles.homeLi} >영화</Li>
            <Li className={styles.homeLi} >TV 프로그램</Li>
            <Li className={styles.homeLi} >인물</Li>
          </Ul>
        </Nav>
      </Header>
    );
  });

const Header = styled('header', {
  width: '100%',
  minWidth: '1440px',
  height: '5rem',
  background: '#fafafa',
  zIndex: 100,
});

const Nav = styled('nav', {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Logo = styled('h1', {
  marginLeft: '1rem',
  fontSize: '1.6rem',
  fontWeight: 800,
});

const Ul = styled('ul', {
  display: 'flex',
  marginRight: '1rem',
  listStyle: 'none',
  columnGap: '1rem'
});

const Li = styled('li', {
  fontSize: '1.4rem',
  fontWeight: 800,
});

export default MediaDBHeader;