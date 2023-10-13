import { useState, forwardRef, Ref, useEffect } from 'react'
import { HeaderWrap, Nav, Logo, NavUl, NavLi, NavButton } from '../common/HeaderObject'
import { UsePortfolioHeader } from '../../hooks/usePortfolioHeader'
import styles from './PortfolioHeader.module.css'

const PortfolioHeader = forwardRef(
  ({ events }: { events: UsePortfolioHeader }, ref: Ref<HTMLElement>) => {
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
      <HeaderWrap ref={ref} style={{ top: top }}>
        <Nav>
          <Logo>
            <NavButton onClick={events.moveHome}>PORTFOLIO</NavButton>
          </Logo>
          <NavUl>
            <NavLi>
              <NavButton className={styles.underline} onClick={events.moveTop}>TOP</NavButton>
            </NavLi>
            <NavLi>
              <NavButton className={styles.underline} onClick={events.moveProject}>PROJECT</NavButton>
            </NavLi>
            <NavLi>
              <NavButton className={styles.underline} onClick={events.moveAbout}>ABOUT</NavButton>
            </NavLi>
          </NavUl>
        </Nav>
      </HeaderWrap>
    );
  });

export default PortfolioHeader;