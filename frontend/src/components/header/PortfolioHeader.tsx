import { useState, useEffect } from 'react'
import { HeaderWrap, Nav, Logo, NavUl, NavLi, NavButton } from '../common/HeaderObject'
import { PortfolioHeaderEvents } from '../../hooks/usePortfolioHeaderEvents'
import styles from './PortfolioHeader.module.css'

const PortfolioHeader = (({ events }: { events: PortfolioHeaderEvents }) => {
  const [top, setTop] = useState<number>(0);

  let lastScrollY = scrollY;
  const handleScroll = (event: Event) => {
    event.preventDefault();
    if (lastScrollY - scrollY >= 0)
      setTop(scrollY);
    lastScrollY = scrollY;
  };

  useEffect(() => {
    addEventListener('scroll', handleScroll);

    return () => removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrap style={{ top: top }}>
      <Nav>
        <Logo className={styles.logo}>
          <NavButton onClick={events.moveHome}>PORTFOLIO</NavButton>
        </Logo>
        <NavUl>
          <NavLi>
            <NavButton className={styles.navButton} onClick={events.moveTop}>TOP</NavButton>
          </NavLi>
          <NavLi>
            <NavButton className={styles.navButton} onClick={events.moveProject}>PROJECT</NavButton>
          </NavLi>
          <NavLi>
            <NavButton className={styles.navButton} onClick={events.moveAbout}>ABOUT</NavButton>
          </NavLi>
        </NavUl>
      </Nav>
    </HeaderWrap>
  );
});

export default PortfolioHeader;