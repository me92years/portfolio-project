import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@stitches/react';
import styles from './PortfolioHeader.module.css';

interface PortfolioHeaderProps {
  currentTop: number,
  events: {
    onClickTopLi: () => void;
    onClickProjectLi: () => void;
    onClickAboutLi: () => void;
  }
}

const PortfolioHeader = React.forwardRef(
  (props: PortfolioHeaderProps, ref: React.Ref<HTMLElement>) => {
    return (
      <Header ref={ref} style={{ position: 'absolute', top: props.currentTop }}>
        <Nav>
          <Logo>
            <Link className={styles.homeLogo} to='/'>KIM's PORTFOLIO</Link>
          </Logo>
          <Ul>
            <Li className={styles.homeLi} onClick={props.events.onClickTopLi}>TOP</Li>
            <Li className={styles.homeLi} onClick={props.events.onClickProjectLi}>PROJECT</Li>
            <Li className={styles.homeLi} onClick={props.events.onClickAboutLi}>ABOUT</Li>
          </Ul>
        </Nav>
      </Header>
    );
  })

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
  marginLeft: '2rem',
  fontSize: '1.6rem',
  fontWeight: 800,
});

const Ul = styled('ul', {
  display: 'flex',
  marginRight: '2rem',
  listStyle: 'none',
  columnGap: '1rem'
});

const Li = styled('li', {
  fontSize: '1.4rem',
  fontWeight: 800,
});

export default PortfolioHeader;
